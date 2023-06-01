import { SetterOrUpdater } from "recoil";
import { setToast } from "../setToast";
import { sendVerificationEmail } from "../sendVerificationEmail";
import axiosInstance from "../axiosInstance";
import { EditProfileInitialValues, IUpdateProfileProps, ILayoutState, IUserState } from "@types";

export const updatePhoto = (
    e: React.ChangeEvent<HTMLInputElement>, 
    values: EditProfileInitialValues, 
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    setModal:  SetterOrUpdater<ILayoutState>,
    imgUrlToBeDeleted: string,
    user: IUserState | null,
) => {
    if(e.target.files) {
        const file = e.target.files[0];
        if (file.size > 2097152) {
            setToast('error', 'Image size must be less than 2MB', setModal)
            return;
        }

        const url = URL.createObjectURL(file);
        setFieldValue('photoUrl', 'a'+user?.photoUrl);         
        setModal(modal => ({
            ...modal, 
            imageBlob: url,
            selectedFile: file,
            imgUrlToBeDeleted: imgUrlToBeDeleted ? imgUrlToBeDeleted : values.photoUrl,
        }))
    }
}

export const removePhoto = (
    values: EditProfileInitialValues, 
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    imageBlob: string,
    selectedFile: File | null,
    setModal:  SetterOrUpdater<ILayoutState>,
) => {
    if(imageBlob || selectedFile) {
        setModal(modal => ({
            ...modal,
            imageBlob: '',
            selectedFile: null
        }))
    } else {
        setModal(modal => ({
            ...modal,
            imgUrlToBeDeleted: values.photoUrl,
        }));
    } 
    setFieldValue('photoUrl', '');
}

export const editProfile = ({selectedFile, values, setLoading, setSubmitting, setModal, imgUrlToBeDeleted, user, setUser}: IUpdateProfileProps) => {
    setLoading(true);
    const formData = new FormData();
    if(selectedFile) formData.append('image', selectedFile);
    const content = selectedFile ? formData : values
    const file = selectedFile ? true : false
    const emailChanged = user?.email !== values.email.toLowerCase()

    const isFormData = content instanceof FormData;
    const parts = imgUrlToBeDeleted.split("/");
    const publicId = parts[parts.length - 2] + "/" + parts[parts.length - 1].split(".")[0];

    if(file && !imgUrlToBeDeleted) { //NEW UPLOAD WITH FIELDS: no previous image, just upload fresh image
        values.fieldsAndFreshImage = true
        values.withFormData = true
    } else if(file && imgUrlToBeDeleted) { //NEW UPLOAD WITH FIELDS: delete previous image, reupload new image
        values.fieldsAndDeletePrevAndUploadNew = true
        values.public_id = publicId
        values.withFormData = true
    } else if(!file && imgUrlToBeDeleted) { //DELETE PREVIOUS IMAGE: just delete previous image, upload just fields without image
        values.fieldsAndDeletePrevWithoutUploadNew = true
        values.public_id = publicId
    }  // if none of the above, only fields are edited

    axiosInstance.patch("/user", content, {
        headers: isFormData ? {
            'Content-Type':'multipart/form-data'
        } : {},
        params: isFormData ? values : {}
    }).then(async (res) => {
        if (res.status === 200) {
            if(emailChanged) sendVerificationEmail(setModal) 
            setToast('success', 'Profile updated successfully', setModal)
            setLoading(false);
            setSubmitting(false);
            setModal(modal => ({
                ...modal, 
                editProfileModal: false,
                imageBlob: '',
                selectedFile: null,
                imgUrlToBeDeleted: '',
                submitError: null
            }))

            setUser(res.data.user)
        }
    }).catch((error) => {
        setLoading(false);
        setSubmitting(false);
        if(error.response.status === 409) {
            setModal(modal => ({
                ...modal, 
                submitError: 'Email already exist'
            }))
        } else {
            setToast('error', 'Unable to update profile, please try again', setModal)
        }
    })
}

export const objectsAreEqual = (values: EditProfileInitialValues, user: IUserState | null) => {
    const keysToCheck = ['email', 'firstName', 'lastName', 'photoUrl'];
    for (let prop of keysToCheck) {
        if (prop in values) {
        const val1 = user ? user[prop as keyof IUserState].toString().toLowerCase() : '';
        const val2 = values[prop as keyof EditProfileInitialValues]?.toString().toLowerCase();
        if (val1 !== val2) {
            return false;
        }
        }
    }
    return true;
};