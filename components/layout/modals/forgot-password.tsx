import {useState} from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup';
import FormField from './field'
import { Loader } from '../../loader'
import { useRecoilState } from 'recoil'
import { layoutState } from '../../../states'
import { AiOutlineMail } from 'react-icons/ai';
import ModalLayout from './modal-layout';
import { setToast } from '../../../utils/setToast';
import axiosInstance from '../../../utils/axiosInstance';
import { ForgotPasswordInitialValues } from '../../../types';

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
    setLoading(true);

    axiosInstance.post("/forgot-password", values)
      .then(async (res) => {
        setLoading(false);
        
        if (res.status === 200) {
            setModal( modal => ({
                ...modal,
                forgotPasswordModal: false,
                forgotPasswordMailSent: true,
                forgotPasswordMail: values.email
            }));
        }
      })
      .catch((error) => {
        setToast('error', 'Unknown error, please try again', setModal)
        setLoading(false);
        setSubmitting(false);
      })
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
                                    title='Email' 
                                    icon={<AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} />} 
                                    name='email'
                                    placeholder='Enter your email'
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