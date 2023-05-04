import {useState, useRef} from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil';
import { layoutState, userState } from '../../../states';
import ModalLayout from './modal-layout';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import FormField from './field'
import axios from 'axios';
import { toast } from "react-toastify";
import { fetchUser } from '../../../utils/fetchFns';
import { AiOutlineEdit, AiOutlineMail, AiOutlineUser, AiOutlineDelete } from 'react-icons/ai'
import { Loader } from '../../loader';
import Image from 'next/image'

interface EditProfileInitialValues {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
}

const EditProfileModal = () => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const [modal, setModal] = useRecoilState(layoutState);
    const closeModal = useResetRecoilState(layoutState);
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

    const updateProfile = async (values: EditProfileInitialValues, setSubmitting: (isSubmitting: boolean) => void) => {
        axios.patch("/user", values, { withCredentials: true })
        .then(async (res) => {
            setLoading(false);
            
            if (res.status === 200) {
                toast.success('Profile updated successfully');
                closeModal(); 

                const user = await fetchUser();
                setUser(user);
            }
        }).catch((error) => {
            setLoading(false);
            setSubmitting(false);
            toast.error('Unable to update profile, please try again');
        })
    }

    const updatePhotoAndProfile = async (values: EditProfileInitialValues, setSubmitting: (isSubmitting: boolean) => void) => {
        const formData = new FormData();

        if(selectedFile) {
            formData.append('image', selectedFile)

            axios.post("/update-photo", formData, { withCredentials: true, 
                headers: {
                    'Content-Type':'multipart/form-data'
                } 
            }).then(async (res) => {
                if (res.status === 200) {
                    updateProfile({ ...values, photoUrl: res.data.image.src}, setSubmitting);
                }
            }).catch((error) => {
                setLoading(false);
                setSubmitting(false);
                toast.error('Unable to update profile, please try again');
            })
        }
    }
    
    const deletehotoAndUpdateProfile = (values: EditProfileInitialValues, setSubmitting: (isSubmitting: boolean) => void, reupload?: boolean) => {
        const image = imgUrlToBeDeleted;
        const parts = image.split("/");
        const publicId = parts[parts.length - 2] + "/" + parts[parts.length - 1].split(".")[0]
        const encodedPublicId = encodeURIComponent(publicId); //cos publicId has another '/'
        
        axios.delete(`/update-photo/${encodedPublicId}`, { withCredentials: true })
        .then(async (res) => {
            
            if (res.status === 200) {
                if(reupload) {
                    updatePhotoAndProfile(values, setSubmitting);
                } else {
                    updateProfile(values, setSubmitting)
                }
            }
        }).catch((error) => {
            setLoading(false);
            setSubmitting(false);
            toast.error('Unable to update profile, please try again');
        })
    }


    const updateProfileOnce = (values: EditProfileInitialValues, setSubmitting: (isSubmitting: boolean) => void) => {
        axios.patch("/user", values, { withCredentials: true })
        .then(async (res) => {
            setLoading(false);
            
            if (res.status === 200) {
                toast.success('Profile updated successfully');
                closeModal(); 

                const user = await fetchUser();
                setUser(user);
            }
        }).catch((error) => {
            setLoading(false);
            setSubmitting(false);
            toast.error('Unable to update profile, please try again');
        })
    }

  const handleSubmit = (values: EditProfileInitialValues, { setSubmitting }: FormikHelpers<EditProfileInitialValues>) => {
    const formData = new FormData();
    setLoading(true);
    
    if(selectedFile && !imgUrlToBeDeleted) { //NEW UPLOAD WITH FIELDS: no previous image, just upload fresh image
        formData.append('image', selectedFile)
        
        
        
        
        // updatePhotoAndProfile(values, setSubmitting)
    } else if(selectedFile && imgUrlToBeDeleted) { //NEW UPLOAD WITH FIELDS: delete previous image, reupload new image
        deletehotoAndUpdateProfile(values, setSubmitting, true)
    } else if(!selectedFile && imgUrlToBeDeleted) { //DELETE PREVIOUS IMAGE: just delete previous image, upload just fields without image
        deletehotoAndUpdateProfile(values, setSubmitting)
    } else { // no upload or delete, just fields
        updateProfile(values, setSubmitting);
    }
  }

  const updatePhoto = (e: React.ChangeEvent<HTMLInputElement>, values: EditProfileInitialValues) => {
    if(e.target.files) {
        const file = e.target.files[0];
        if (file.size > 2097152) {
            toast.error('Image size must be less than 2MB');
            return;
        }

        const url = URL.createObjectURL(file);
        setModal(modal => ({
            ...modal, 
            imageBlob: url,
            selectedFile: file,
            imgUrlToBeDeleted: imgUrlToBeDeleted ? imgUrlToBeDeleted : values.photoUrl,
        }))
    }
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
                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
                                <input type="file" name='photoUrl' accept="image/*" hidden ref={inputRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePhoto(e, values)} />

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
                                
                    
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
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