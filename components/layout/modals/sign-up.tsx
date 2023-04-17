import React, {useState} from 'react'
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { navbarState, userState } from '../../../states'
import ModalLayout from './modal-layout'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import FormField from './field'
import axios from 'axios'
import { toast } from "react-toastify";
import { SignUpInitialValues } from '../../../types'
import { Loader } from '../../loader'
import { fetchUser } from '../../../utils/fetchFns'
import { attachCookiesToResponse } from '../../../utils/jwt'

const SignUpModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(navbarState);
    const closeModal = useResetRecoilState(navbarState);
    const [user, setUser] = useRecoilState(userState);

    const initialValues: SignUpInitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Enter first name").min(3, "First name must be at least 3 characters"),
        lastName: Yup.string().required("Enter last name").min(3, "Last name must be at least 3 characters"),
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        password: Yup.string().required("Enter password").min(6, "Password must be at least 6 characters"),
    });  

  const handleSubmit = (values: SignUpInitialValues, { setSubmitting }: FormikHelpers<SignUpInitialValues>) => {
    setLoading(true);

    axios.post("auth/register", values, { withCredentials: true })
      .then(async (res) => {
        setLoading(false);

        if (res.status === 201) {
            toast.success('Account created successfully');
            closeModal();
            attachCookiesToResponse(res.data.user)

            const user = await fetchUser();
            setUser(user)
            setModal(modal => ({
                ...modal,
                verifyEmailMailSent: true
            }))
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false)

        if(error.response.status === 400) {
            toast.error('Email already exist');
        } else if (error.response.status === 500) {
            toast.error('Unknown error, please try again');
        }
      });


  }
    
  return (
    <>
        { modal.signUpModal && (
            <ModalLayout heading='Create Account' signUp> 
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, values, touched }) => {
                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
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
                                
                                <FormField 
                                    title='Password' 
                                    icon={<AiOutlineLock size={25} color={touched.password && errors.password ? '#E65050' : '#000'} />} 
                                    name='password'
                                    placeholder='Enter your password'
                                    password
                                    error={touched.password && errors.password !== undefined}
                                    value={values.password}
                                />
                                
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                    { loading ? <Loader /> : 'Create Account' }
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

export default SignUpModal