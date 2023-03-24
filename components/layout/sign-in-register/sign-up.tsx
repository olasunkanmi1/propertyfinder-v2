import React, {useState, useEffect} from 'react'
import { AiOutlineClose, AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRecoilValue } from 'recoil'
import { navbarState } from '../../../states'
import { useRouter } from 'next/router'
import ModalLayout from './modal-layout'
import * as Yup from 'yup';
import { Form, Formik, FormikErrors } from 'formik'
import FormField from './field'
import axios from 'axios'
import { toast } from "react-toastify";
import { SignUpInitialValues } from '../../../types'
import { Loader } from '../../loader'

const SignUpModal = () => {
    const [loading, setLoading] = useState(false);
    const modal = useRecoilValue(navbarState);

    const initialValues: SignUpInitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Enter first name"),
        lastName: Yup.string().required("Enter last name"),
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        password: Yup.string().required("Enter password"),
    });  

  const handleSubmit = (values: SignUpInitialValues) => {
    setLoading(true);

    axios.post("auth/register", values)
      .then((res) => {
        setLoading(false);
        
        if (res.status === 200) {
          toast.success('Logged in successfully');
        }

      })
      .catch((error) => {
        console.log(error)
        setLoading(false);

        // if (error.response.status === 500) {
        //   toast.error('Incorrect Email');
        // } else if (error.response.status === 401) {
        //   toast.error('Incorrect Password');
        // } else {
        //   toast.error('Unknown Error');
        // }
      });


  }
    
  return (
    <>
        { modal.signUpModal && (
            <ModalLayout heading='Create Account'> 
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, values }) => {
                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
                                <FormField 
                                    title='First Name' 
                                    icon={<AiOutlineUser size={25} color={errors.email ? '#E65050' : '#000'} />} 
                                    name='firstName'
                                    placeholder='Enter your first name'
                                    error={errors.firstName !== undefined}
                                />
                                
                                <FormField 
                                    title='Last Name' 
                                    icon={<AiOutlineUser size={25} color={errors.email ? '#E65050' : '#000'} />} 
                                    name='lastName'
                                    placeholder='Enter your last name'
                                    error={errors.lastName !== undefined}
                                />

                                <FormField 
                                    title='Email' 
                                    icon={<AiOutlineMail size={25} color={errors.email ? '#E65050' : '#000'} />} 
                                    name='email'
                                    placeholder='Enter your email'
                                    error={errors.email !== undefined}
                                />
                                
                                <FormField 
                                    title='Password' 
                                    icon={<AiOutlineLock size={25} color={errors.password ? '#E65050' : '#000'} />} 
                                    name='password'
                                    placeholder='Enter your password'
                                    password
                                    error={errors.password !== undefined}
                                    value={values.password}
                                />
                                
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed'> 
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