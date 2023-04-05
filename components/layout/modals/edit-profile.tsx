import React, {useState, useRef} from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { navbarState, userState } from '../../../states';
import ModalLayout from './modal-layout';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import FormField from './field'
import axios from 'axios';
import { toast } from "react-toastify";
import { fetchUser } from '../../../utils/fetchFns';
import { AiOutlineEdit, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { Loader, Spinner } from '../../loader';
import Image from 'next/image'

interface EditProfileInitialValues {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
}

const EditProfileModal = () => {
    const [loading, setLoading] = useState(false);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [modal, setModal] = useRecoilState(navbarState);
    const closeModal = useResetRecoilState(navbarState);
    const [user, setUser] = useRecoilState(userState);
    const inputRef = useRef<HTMLInputElement>(null)

    const initialValues: EditProfileInitialValues = {
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        photoUrl: user ? user.photoUrl : '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Enter first name"),
        lastName: Yup.string().required("Enter last Name"),
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        photoUrl: Yup.string(),
    });  

  const handleSubmit = (values: EditProfileInitialValues, { setSubmitting }: FormikHelpers<EditProfileInitialValues>) => {
    setLoading(true);

    axios.patch("user", values, { withCredentials: true })
      .then(async (res) => {
        setLoading(false);
        
        if (res.status === 200) {
            toast.success('Profile updated successfully');
            closeModal(); 

            const user = await fetchUser();
            setUser(user);
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false);
        toast.error('Unable to update profile, please try again');
      })
  }

  const updatePhoto = (e: React.ChangeEvent<HTMLInputElement> ,setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    setPhotoLoading(true);
    if(e.target.files) {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image',imageFile)

        axios.post("user/update-photo", formData, { withCredentials: true, 
            headers: {
            'Content-Type':'multipart/form-data'
        } 
        })
        .then(async (res) => {
            setPhotoLoading(false);
            
            if (res.status === 200) {
                setFieldValue('photoUrl', res.data.image.src)
            }
        })
        .catch((error) => {
            setPhotoLoading(false);
            toast.error('Unable to upload photo, please try again');
        })

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
                                <>
                                    <div className='flex justify-center items-center w-[70px] h-[70px] rounded-full overflow-hidden bg-secondary m-auto text-white text-xl font-extrabold relative'>
                                        {photoLoading ? <Spinner /> : !values.photoUrl ? (
                                            <> {user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()} </>
                                        ) : (
                                            <Image src={values.photoUrl} alt="display picture" layout='fill' loading='lazy' />
                                        )}
                                    </div>
                                    <input type='file' accept="image/*" ref={inputRef} onChange={(e) => updatePhoto(e, setFieldValue)} hidden />
                                    <span onClick={() => inputRef.current?.click()} className='flex justify-center items-center cursor-pointer text-white p-1 bg-primary rounded-md text-xs w-max m-auto'> <AiOutlineEdit size={17} className='mr-2' /> Edit photo </span>
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