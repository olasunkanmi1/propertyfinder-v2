import {useState} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import ModalLayout from './modal-layout'
import FormField from './field'
import { SignUpInitialValues } from '@types'
import { Loader } from '@components'
import { signUp, signUpFieldArr } from '@utils'
import { layoutState, userState } from '@states'

const SignUpModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const setUser = useSetRecoilState(userState);

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
    signUp({values, setUser, setLoading, setSubmitting, setModal})
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
                    {({ isSubmitting, errors, values, touched }) => (
                        <Form className='space-y-3 flex flex-col justify-end'>
                            { signUpFieldArr.map(({title, name, placeholder,}) => {
                            const nameAsType = name as keyof SignUpInitialValues
                            
                            return (
                                <FormField key={name} title={title} name={name} placeholder={placeholder} 
                                    password={name === 'password' ? true : false}
                                    icon={ name === 'password' ?
                                        <AiOutlineLock size={25} color={touched.password && errors.password ? '#E65050' : '#000'} /> :
                                        name === 'email' ?<AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} /> :
                                        <AiOutlineUser size={25} color={touched[nameAsType] && errors[nameAsType] ? '#E65050' : '#000'} />
                                    } 
                                    error={touched[nameAsType] && errors[nameAsType] !== undefined}
                                    value={name === 'password' ? values.password : undefined}
                                />
                            )
                        }) }
                            
                        <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                            { loading ? <Loader /> : 'Create Account' }
                        </button>
                        </Form>
                    )}
                </Formik>
                

            </ModalLayout>
        ) }
    </>
  )
}

export default SignUpModal