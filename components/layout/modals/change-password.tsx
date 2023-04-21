import React, {useState} from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { navbarState, userState } from '../../../states';
import ModalLayout from './modal-layout';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik'
import FormField from './field'
import axios from 'axios';
import { toast } from "react-toastify";
import { fetchUser } from '../../../utils/fetchFns';
import { AiOutlineLock } from 'react-icons/ai'
import { Loader } from '../../loader';

interface ChangePasswordInitialValues {
    oldPassword: string;
    newPassword: string;
}

const ChangePasswordModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(navbarState);
    const closeModal = useResetRecoilState(navbarState);
    const setUser = useSetRecoilState(userState);

    const initialValues: ChangePasswordInitialValues = {
        oldPassword: '',
        newPassword: '',
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required("Enter current password"),
        newPassword: Yup.string().required("Enter new password").notOneOf([Yup.ref('oldPassword')], 'New password must be different from current password').min(6, "Password must be at least 6 characters"),
    });  

  const handleSubmit = (values: ChangePasswordInitialValues, { setSubmitting }: FormikHelpers<ChangePasswordInitialValues>) => {
    setLoading(true);

    axios.patch("/update-password", values, { withCredentials: true })
      .then(async (res) => {
        setLoading(false);
        
        if (res.status === 200) {
            toast.success('Password updated successfully');
            closeModal(); 
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false);

        if(error.response.status === 401) {
            toast.error('Current password incorrect');
        } else {
            toast.error('Unable to change password, please try again');
        }
      })
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
                                <FormField 
                                    title='Current Password' 
                                    icon={<AiOutlineLock size={25} color={touched.oldPassword && errors.oldPassword ? '#E65050' : '#000'} />} 
                                    name='oldPassword'
                                    placeholder='Enter current Password'
                                    password
                                    error={touched.oldPassword && errors.oldPassword !== undefined}
                                    value={values.oldPassword}
                                />
                                
                                <FormField 
                                    title='New Password' 
                                    icon={<AiOutlineLock size={25} color={touched.newPassword && errors.newPassword ? '#E65050' : '#000'} />} 
                                    name='newPassword'
                                    placeholder='Enter new Password'
                                    password
                                    error={touched.newPassword && errors.newPassword !== undefined}
                                    value={values.newPassword}
                                />
                                
                    
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