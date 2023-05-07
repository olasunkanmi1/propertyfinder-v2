import {useState} from 'react'
import dynamic from 'next/dynamic'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { layoutState, userState, propertiesState } from '../../../states'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { SignInInitialValues } from '../../../types'
import { Loader } from '../../loader'
import { setToast } from '../../../utils/setToast'
import axiosInstance from '../../../utils/axiosInstance'
const ModalLayout = dynamic(() => import('./modal-layout')) 
const FormField = dynamic(() => import('./field')) 

const SignInModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const setUser = useSetRecoilState(userState);
    const setProperties = useSetRecoilState(propertiesState);

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
    if(modal.ptyToSaveOnLogin) values.ptyToSaveOnLogin = modal.ptyToSaveOnLogin

    axiosInstance.post("/login", values)
      .then(async (res) => {
        const {alreadySaved} = res.data
        setLoading(false);
        
        if (res.status === 200) {
            setToast('success', 'Logged in successfully', setModal)
            if (alreadySaved !== undefined && !alreadySaved) {
              setToast('success', 'Property saved', setModal)
            }

            setModal( modal => ({
                ...modal,
                signInModal: false,
            }));

          setUser(res.data.user)
            setProperties(properties => ({
                ...properties,
                savedProperties: res.data.savedProperties,
                ptyToSaveOnLogin: undefined
            }))
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false)

        if(error.response.status === 401) {
            setToast('error', 'Invalid email or password', setModal)
        } else {
            setToast('error', 'Unknown error, please try again', setModal)
        }
      })
  }

  const openForgotPasswordModal = () => {
    setModal( modal => ({
        ...modal,
        signInModal: false,
        forgotPasswordModal: true,
    }));
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
                                
                                <button type='button' className='text-sm text-primary font-semibold ml-auto' onClick={openForgotPasswordModal}> Forgot password </button>
                    
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