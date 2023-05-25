import {useState, useRef} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import ModalLayout from './modal-layout'
import FormField from './field'
import { layoutState, userState, propertiesState } from '@states'
import { SignInInitialValues } from '@types'
import { Loader } from '@components'
import { signIn, openForgotPasswordModal, signInFieldArr, useListenForChange } from '@utils'

const SignInModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const setUser = useSetRecoilState(userState);
    const setProperties = useSetRecoilState(propertiesState);
    const fieldWrapperRef = useRef<HTMLDivElement | null>(null);
    const {submitError} = modal;

    const initialValues: SignInInitialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
        password: Yup.string().required("Enter password"),
    });  

    const handleSubmit = (values: SignInInitialValues, { setSubmitting }: FormikHelpers<SignInInitialValues>) => {
        signIn({modal, values, setUser, setProperties, setLoading, setSubmitting, setModal})
    }

    //cheeck for change in email input so as to remove error message
    useListenForChange({fieldWrapperRef, setModal, submitError})

  return (
    <>
        { modal.signInModal && (
            <ModalLayout heading='Log in to your Account' signIn> 
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, errors, values, touched }) => (
                        <Form>
                            <div className='formSpacing' ref={fieldWrapperRef}>
                                { signInFieldArr.map(({title, name, placeholder,}) => {
                                    const nameAsType = name as keyof SignInInitialValues
                                    
                                    return (
                                        <FormField key={name} title={title} name={name} placeholder={placeholder} 
                                            password={name === 'password' ? true : false}
                                            icon={ name === 'password' ?
                                                <AiOutlineLock size={25} color={touched.password && errors.password? '#E65050' : '#000'} /> :
                                                <AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} />
                                            } 
                                            error={touched[nameAsType] && errors[nameAsType] !== undefined}
                                            value={name === 'password' ? values.password : undefined}
                                        />
                                    )
                                }) }
                            
                                <button type='button' className='text-sm text-primary font-semibold ml-auto' onClick={() => openForgotPasswordModal(setModal)}> Forgot password </button>
                    
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                    { loading ? <Loader /> : 'Sign In' }
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalLayout>
        ) }
    </>
  )
}

export default SignInModal