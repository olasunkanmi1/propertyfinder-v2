import axios from "axios";
import { IUpdateProfileProps } from "../types";
import { setToast } from "./setToast";

export const editProfile = ({content, values, setLoading, setSubmitting, setModal, file, imgUrlToBeDeleted, setUser}: IUpdateProfileProps) => {
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
    } else { // no upload or delete, just fields
        values.justFields = true
    }

    axios.patch("/user", content, { withCredentials: true, 
        headers: isFormData ? {
            'Content-Type':'multipart/form-data'
        } : {},
        params: isFormData ? values : {}
    }).then(async (res) => {
        if (res.status === 200) {
            setToast('success', 'Profile updated successfully', setModal)
            setLoading(false);
            setSubmitting(false);
            setModal(modal => ({...modal, editProfileModal: false}))

            setUser(res.data.user)
        }
    }).catch((error) => {
        setLoading(false);
        setSubmitting(false);
        setToast('error', 'Unable to update profile, please try again', setModal)
    })
}