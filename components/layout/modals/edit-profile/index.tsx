import {useState, useRef} from 'react'
import { useRecoilState } from 'recoil';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import ModalLayout from '../modal-layout';
import Field from './field'
import PhotoContainer from './photo-container';
import { Loader } from '@components';
import { layoutState, userState } from '@states';
import { EditProfileInitialValues } from '@types';
import { updatePhoto, editProfile, objectsAreEqual } from '@utils';

const EditProfileModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const [user, setUser] = useRecoilState(userState);
    const inputRef = useRef<HTMLInputElement>(null);    
    const { imageBlob, selectedFile, imgUrlToBeDeleted } = modal

    const initialValues: EditProfileInitialValues = {
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        photoUrl: user ? user.photoUrl : '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Enter first name").min(3, "First name must be at least 3 characters"),
        lastName: Yup.string().required("Enter last Name").min(3, "Last name must be at least 3 characters"),
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        photoUrl: Yup.string(),
    });  

    const handleSubmit = (values: EditProfileInitialValues, { setSubmitting }: FormikHelpers<EditProfileInitialValues>) => {
        setLoading(true);
        const formData = new FormData();
        if(selectedFile) formData.append('image', selectedFile);
        const content = selectedFile ? formData : values
        const file = selectedFile ? true : false
        const emailChanged = user?.email !== values.email

        // ARRANGE VALUES. capitalize firstName/lastName and make email lowercase
        values.firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase();
        values.lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase();
        values.email = values.email.toLowerCase();

        editProfile({content, values, setLoading, setSubmitting, setModal, file, imgUrlToBeDeleted, user, setUser, emailChanged})
    }

  return (
    <>
        { modal.editProfileModal && (
            <ModalLayout heading='Edit your Profile'> 
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, errors, values, touched, setFieldValue }) => (
                        <Form className='space-y-3 flex flex-col justify-end'>
                            <input type="file" name='photoUrl' accept="image/*" hidden ref={inputRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePhoto(e, values, setFieldValue, setModal, imgUrlToBeDeleted, user)} />
                            <PhotoContainer 
                                values={values} imageBlob={imageBlob} 
                                inputRef={inputRef} setFieldValue={setFieldValue}
                                selectedFile={selectedFile} setModal={setModal}
                            />

                            <Field touched={touched} errors={errors} />
                
                            <button type="submit" disabled={isSubmitting || objectsAreEqual(values, user)} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                { loading ? <Loader /> : 'Update profile' }
                            </button>
                        </Form>
                    )}
                </Formik>
            </ModalLayout>
        ) }
    </>
  )
}

export default EditProfileModal