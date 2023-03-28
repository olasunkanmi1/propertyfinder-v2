import React, {useState} from 'react'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { navbarState, userState } from '../../../states'
import { useRouter } from 'next/router'
import ModalLayout from './modal-layout'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import FormField from './field'
import axios from 'axios'
import { toast } from "react-toastify";
import { SignInInitialValues } from '../../../types'
import { Loader } from '../../loader'
import { fetchUser } from '../../../utils/fetchUser'

const SignInModal = () => {
    const [loading, setLoading] = useState(false);
    const modal = useRecoilValue(navbarState);
    const closeModal = useResetRecoilState(navbarState);
    const setUser = useSetRecoilState(userState);

    const initialValues: SignInInitialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        password: Yup.string().required("Enter password"),
    });  

  const handleSubmit = (values: SignInInitialValues, { setSubmitting }: FormikHelpers<SignInInitialValues>) => {
    setLoading(true);

    axios.post("auth/login", values, { withCredentials: true })
      .then(async (res) => {
        setLoading(false);
        
        if (res.status === 200) {
          toast.success('Logged in successfully');
          const user = await fetchUser();
            setUser(user)
          closeModal();
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false)

        if(error.response.status === 401) {
            toast.error('Invalid email or password');
        } else if (error.response.status === 500) {
            toast.error('Unknown error, please try again');
        }
      })
  }
    
  return (
    <>
        { modal.signInModal && (
            <ModalLayout heading='Log in to your Account' signIn> 
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, values, touched }) => {
                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
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
                                
                                <button type='button' className='text-xs text-primary font-semibold ml-auto'> Forgot password </button>
                    
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                    { loading ? <Loader /> : 'Sign In' }
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

export default SignInModal