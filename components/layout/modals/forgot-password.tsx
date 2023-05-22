import {useState} from 'react'
import { useRecoilState } from 'recoil'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup';
import { AiOutlineMail } from 'react-icons/ai';
import FormField from './field'
import ModalLayout from './modal-layout';
import { layoutState } from '@states'
import { Loader } from '@components'
import { forgotPassword } from '@utils';
import { ForgotPasswordInitialValues } from '@types';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);

    const initialValues: ForgotPasswordInitialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Enter a Valid Email").required("Enter email"),
    });  

  const handleSubmit = (values: ForgotPasswordInitialValues, { setSubmitting }: FormikHelpers<ForgotPasswordInitialValues>) => {
    forgotPassword({values, setLoading, setSubmitting, setModal})
  }
  
  return (
    <>
        { modal.forgotPasswordModal && (
            <ModalLayout heading='Reset your password'> 
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => {
                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
                                <FormField 
                                    title='Email' name='email' placeholder='Enter your email'
                                    icon={<AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} />} 
                                    error={touched.email && errors.email !== undefined}
                                />
                    
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                    { loading ? <Loader /> : 'Get Reset Link' }
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
export default ForgotPassword