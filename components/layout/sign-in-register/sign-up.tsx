import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../../states'
import { useRouter } from 'next/router'
import ModalLayout from './modal-layout'
import * as Yup from 'yup';
import { Form, Formik } from 'formik'
import FormField from './field'

interface SignInInitialValues {
    email: string;
    password: string;
}

const SignUpModal = () => {
    const initialValues: SignInInitialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Enter a Valid Email").required("You know the drill"),
        password: Yup.string().required("Enter password"),
    });  

  const handleSubmit = (values: SignInInitialValues) => {

  }
    
  return (
    <ModalLayout heading='Log in to your Account' signIn> 
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form className='space-y-3 flex flex-col justify-end'>
                        <FormField 
                            title='Email' 
                            icon={<AiOutlineMail size={25} />} 
                            name=' email'
                            placeholder='Enter your email'
                        />
                        
                        <FormField 
                            title='Password' 
                            icon={<AiOutlineLock size={25} />} 
                            name=' password'
                            placeholder='Enter your password'
                            password
                        />

                        <button type='button' className='text-xs text-primary font-semibold ml-auto'> Forgot password </button>
                    </Form>
                )
            }}
        </Formik>
    </ModalLayout>
  )
}

export default SignUpModal