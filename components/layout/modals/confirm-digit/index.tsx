import {useState} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik'
import ModalLayout from '../modal-layout'
import FormComponent from './form';
import { layoutState, userState } from '@states'
import { ConfirmDigitInitialValues } from '@types'
import { confirmDigit, sendVerificationEmail, setToast } from '@utils'

const ConfirmDigitModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const [user, setUser] = useRecoilState(userState);

    const initialValues: ConfirmDigitInitialValues = {
        code: ['', '', '', '', '', '']
    };

    const validationSchema = Yup.object().shape({
        code: Yup.array()
            .of(
            Yup.string()
                .min(1, 'Enter a digit')
                .required('Verification code is required')
            )
            .min(6, 'Enter a 6-digit code')
            .required('Enter code')
    }); 

    const handleSubmit = (values: ConfirmDigitInitialValues, { setSubmitting }: FormikHelpers<ConfirmDigitInitialValues>) => {
        confirmDigit({values, user, setUser, setLoading, setSubmitting, setModal})     
    }

    const email = user ? user.email : ''
    const resend = () => {
        setModal(modal => ({
            ...modal,
            confirmDigitModal: false,
            submitError: null
        }))
        sendVerificationEmail(setModal)
    }
    
  return (
    <>
        { modal.confirmDigitModal && (
            <ModalLayout confirmDigit> 
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, errors, values, touched, setFieldValue }) => (
                        <FormComponent 
                            values={values} errors={errors} touched={touched}
                            setFieldValue={setFieldValue} email={email}
                            submitError={modal.submitError} setModal={setModal}
                            isSubmitting={isSubmitting} loading={loading}
                            resend={resend}
                        />
                    )}
                </Formik>
            </ModalLayout>
        ) }
    </>
  )
}

export default ConfirmDigitModal