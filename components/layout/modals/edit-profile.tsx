import {useState, useRef} from 'react'
import { useRecoilState } from 'recoil';
import { IUserState, layoutState, userState } from '../../../states';
import ModalLayout from './modal-layout';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import FormField from './field'
import { AiOutlineEdit, AiOutlineMail, AiOutlineUser, AiOutlineDelete } from 'react-icons/ai'
import { Loader } from '../../loader';
import Image from 'next/image'
import { EditProfileInitialValues } from '../../../types';
import { editProfile } from '../../../utils/updateProfile';
import { setToast } from '../../../utils/setToast';

const EditProfileModal = () => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const [modal, setModal] = useRecoilState(layoutState);
    const [user, setUser] = useRecoilState(userState);
    
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

    const updatePhoto = (e: React.ChangeEvent<HTMLInputElement>, values: EditProfileInitialValues, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        if(e.target.files) {
            const file = e.target.files[0];
            if (file.size > 2097152) {
                setToast('error', 'Image size must be less than 2MB', setModal)
                return;
            }

            const url = URL.createObjectURL(file);
            setFieldValue('photoUrl', url);
            setModal(modal => ({
                ...modal, 
                imageBlob: url,
                selectedFile: file,
                imgUrlToBeDeleted: imgUrlToBeDeleted ? imgUrlToBeDeleted : values.photoUrl,
            }))
        }
    }

    const removePhoto = (values: EditProfileInitialValues, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
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

    const handleSubmit = (values: EditProfileInitialValues, { setSubmitting }: FormikHelpers<EditProfileInitialValues>) => {
        setLoading(true);
        const formData = new FormData();
        if(selectedFile) formData.append('image', selectedFile);
        const content = selectedFile ? formData : values
        const file = selectedFile ? true : false

        // ARRANGE VALUES. capitalize firstName/lastName and make email lowercase
        values.firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase();
        values.lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase();
        values.email = values.email.toLowerCase();

        editProfile({content, values, setLoading, setSubmitting, setModal, file, imgUrlToBeDeleted, setUser})
    }

  return (
    <>
        { modal.editProfileModal && (
            <ModalLayout heading='Edit your Profile'> 
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, values, touched, setFieldValue }) => {
                        const objectsAreEqual = () => {
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

                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
                                <input type="file" name='photoUrl' accept="image/*" hidden ref={inputRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePhoto(e, values, setFieldValue)} />

                                <>
                                    <div className='flex justify-center items-center w-[70px] h-[70px] shadow-md rounded-full overflow-hidden bg-secondary m-auto text-white text-xl font-extrabold relative'>
                                        {!values.photoUrl && !imageBlob ? (
                                            <> {values.firstName.charAt(0).toUpperCase()}{values.lastName.charAt(0).toUpperCase()} </>
                                        ) : imageBlob ? (
                                            <Image src={imageBlob} alt="display picture" layout='fill' loading='lazy' />
                                        ) : (
                                            <Image src={values.photoUrl} alt="display picture" layout='fill' loading='lazy' />
                                        )}
                                    </div>

                                    <div className={`flex w-full space-x-1 m-auto ${values.photoUrl || imageBlob ? 'justify-between' : 'justify-center'}`}>
                                        <span onClick={() => inputRef.current?.click()} className='flex justify-center items-center cursor-pointer text-white p-1 bg-primary rounded-md text-sm w-max'> <AiOutlineEdit size={15} className='mr-[3px]' /> Update photo </span>
                                        { values.photoUrl || imageBlob ? <span onClick={() => removePhoto(values, setFieldValue)} className='flex justify-center items-center cursor-pointer text-white p-1 bg-[#E65050] rounded-md text-sm w-max'> <AiOutlineDelete size={15} className='mr-[3px]' /> Delete photo </span> : null}
                                    </div>
                                </>

                                <FormField 
                                    title='First Name' 
                                    icon={<AiOutlineUser size={25} color={touched.firstName && errors.firstName ? '#E65050' : '#000'} />} 
                                    name='firstName'
                                    placeholder='Enter your first name'
                                    error={touched.firstName && errors.firstName !== undefined}
                                />
                                
                                <FormField 
                                    title='Last Name' 
                                    icon={<AiOutlineUser size={25} color={touched.lastName && errors.lastName ? '#E65050' : '#000'} />} 
                                    name='lastName'
                                    placeholder='Enter your last name'
                                    error={touched.lastName && errors.lastName !== undefined}
                                />

                                <FormField 
                                    title='Email' 
                                    icon={<AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} />} 
                                    name='email'
                                    placeholder='Enter your email'
                                    error={touched.email && errors.email !== undefined}
                                />
                                
                    
                                <button type="submit" disabled={isSubmitting || objectsAreEqual()} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                    { loading ? <Loader /> : 'Update profile' }
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalLayout>
        ) }
    </>
  )
}

export default EditProfileModal