import {useState} from 'react'
import { useRecoilState } from 'recoil';
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup';
import { AiOutlineLock } from 'react-icons/ai'
import ModalLayout from './modal-layout';
import FormField from './field'
import { Loader } from '@components';
import { changePassword, changePasswordFieldArr } from '@utils';
import { ChangePasswordInitialValues } from '@types';
import { layoutState } from '@states';

const ChangePasswordModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);

    const initialValues: ChangePasswordInitialValues = {
        oldPassword: '',
        newPassword: '',
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required("Enter current password"),
        newPassword: Yup.string().required("Enter new password").notOneOf([Yup.ref('oldPassword')], 'New password must be different from current password').min(6, "Password must be at least 6 characters"),
    });  

  const handleSubmit = (values: ChangePasswordInitialValues, { setSubmitting }: FormikHelpers<ChangePasswordInitialValues>) => {
    changePassword({values, setLoading, setSubmitting, setModal})
  }
  return (
    <>
        { modal.changePasswordModal && (
            <ModalLayout heading='Change your Password'> 
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, values, touched }) => {
                        return (
                            <Form className='space-y-3 flex flex-col justify-end'>
                                { changePasswordFieldArr.map(({title, name, placeholder,}) => {
                                    const nameAsType = name as keyof ChangePasswordInitialValues
                                    
                                    return (
                                        <FormField key={name} title={title} name={name} placeholder={placeholder} password
                                            icon={<AiOutlineLock size={25} color={touched[nameAsType] && errors[nameAsType] ? '#E65050' : '#000'} />} 
                                            error={touched[nameAsType] && errors[nameAsType] !== undefined}
                                            value={values[nameAsType]}
                                        />
                                    )
                                }) }
                    
                                <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
                                    { loading ? <Loader /> : 'Change password' }
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

export default ChangePasswordModal