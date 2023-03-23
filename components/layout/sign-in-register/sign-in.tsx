import React, {useState, useEffect} from 'react'
import { AiOutlineClose, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../../states'
import { useRouter } from 'next/router'
import ModalLayout from './modal-layout'
import * as Yup from 'yup';
import { Form, Formik, FormikErrors } from 'formik'
import FormField from './field'
import axios from 'axios'
import { toast } from "react-toastify";
import { SignInInitialValues } from '../../../types'
import { Loader } from '../../loader'

const SignInModal = () => {
    const [loading, setLoading] = useState(false);

    const initialValues: SignInInitialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        password: Yup.string().required("Enter password"),
    });  

  const handleSubmit = (values: SignInInitialValues) => {
    setLoading(true);

    axios.post("auth/login", values)
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

  const ValidateForm = ({ validateForm }: any ) => {
    useEffect(() => {
        validateForm();
    }, [validateForm]);

    return null;
    }
    
  return (
    <ModalLayout heading='Log in to your Account' signIn> 
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, isSubmitting, errors, validateForm }) => {
                return (
                    <Form className='space-y-3 flex flex-col justify-end'>
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
                        />
            
                        <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed'> 
                            { loading ? <Loader /> : 'Sign In' }
                        </button>
                        <ValidateForm validateForm={validateForm}  />
                    </Form>
                )
            }}
        </Formik>
        

        <button type='button' className='text-xs text-primary font-semibold ml-auto'> Forgot password </button>
    </ModalLayout>
  )
}

export default SignInModal