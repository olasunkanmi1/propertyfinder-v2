import React, {useState} from 'react'
import Head from 'next/head'
import Image from "next/image"
import logo from '../../public/assets/logo.png'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import axios from 'axios'
import { AiOutlineLock } from "react-icons/ai";
import FormField from "../../components/layout/modals/field";
import { useSetRecoilState } from 'recoil';
import { navbarState } from '../../states';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../components/loader';
import {useRouter} from 'next/router';
import success from '../../public/assets/success.webp'
import { GetServerSideProps } from 'next';

interface ResetPasswordInitialValues {
    password: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const setModal = useSetRecoilState(navbarState);
    const router = useRouter();

    const initialValues: ResetPasswordInitialValues = {
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        password: Yup.string().required("Enter password").min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string().required("Confirm password").oneOf([Yup.ref('password')], 'Passwords must match')
    });  

  const handleSubmit = (values: ResetPasswordInitialValues, { setSubmitting }: FormikHelpers<ResetPasswordInitialValues>) => {
      setLoading(true);
      const obj = {
        passwordToken: router.query.token,
        email: router.query.email,
        password: values.password
      }

    axios.post("auth/reset-password", obj, { withCredentials: true})
      .then(async (res) => {
        setLoading(false);
        
        if (res.status === 200) {
            setShowSuccess(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false);

        toast.error('Unable to reset password');
      })
  }

  const backToLogin = async () => {
        router.push('/');

        setModal( modal => ({
            ...modal,
            signInModal: true,
        }));
    }

  return (
    <>
        <div className='max-h-[calc(100vh-80px)] top-[calc(50%+20px)] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md w-[calc(100%-32px)] ms:w-[295px] z-[25] fixed'>
            <Head>
            <title>Reset your password - PropertyFinder</title>
            <meta name="desciption" content="Find your dream property" />
            </Head>

            <div className="relative pt-6">
                <div className='absolute top-[-56px] left-[50%] translate-x-[-50%] w-[75px] h-[75px] rounded-full overflow-hidden bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] flex items-center justify-center'>
                    <Image src={logo} alt="logo" width={60} height={47} priority />
                </div>
                
                <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
                    {!showSuccess ? (
                        <>
                            <h5 className='font-semibold text-center'> Create a new password </h5>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, values, touched }) => {
                                    return (
                                        <Form className='space-y-3 flex flex-col justify-end'>
                                            <FormField
                                                title='Password' 
                                                icon={<AiOutlineLock size={25} color={touched.password && errors.password ? '#E65050' : '#000'} />} 
                                                name='password'
                                                placeholder='Enter your password'
                                                password
                                                error={touched.password && errors.password !== undefined}
                                                value={values.password}
                                            />
                                            
                                            <FormField 
                                                title='Password' 
                                                icon={<AiOutlineLock size={25} color={touched.confirmPassword && errors.confirmPassword ? '#E65050' : '#000'} />} 
                                                name='confirmPassword'
                                                placeholder='Confirm your password'
                                                password
                                                error={touched.confirmPassword && errors.confirmPassword !== undefined}
                                                value={values.confirmPassword}
                                            />
                                                            
                                            <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                                { loading ? <Loader /> : 'Reset Password' }
                                            </button>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </>
                    ) : (
                        <div className='flex flex-col items-center'>
                            <h1 className='text-primary text-xl font-semibold text-center'> Password reset successfully </h1>

                            <Image src={success} alt='Email Sent' width={180} height={150} loading='lazy' />

                            <button type='button' className='text-primary underline cursor-pointer font-semibold mt-2' onClick={backToLogin}> Proceed to login </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  )
}

export default ResetPassword

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const {token, email} = query
  
    if(!token || !email) {
      return {
          redirect: {
            permanent: false,
            destination: '/',
          },
      }
    }
      
    return {
      props: {},
    };
  };