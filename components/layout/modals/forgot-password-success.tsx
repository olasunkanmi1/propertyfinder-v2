import Image from 'next/image';
import { useRecoilState } from 'recoil'
import ModalLayout from './modal-layout';
import { layoutState } from '@states'
import {mailSent} from '@public'
import { axiosInstance, setToast } from '@utils';

const ForgotPasswordSuccess = () => {
    const [modal, setModal] = useRecoilState(layoutState);

    const resend = () => {
        setToast('loading', 'Sending password reset link...', setModal);

        setModal(modal => ({
            ...modal,
            forgotPasswordMailSent: false,
        }))

        axiosInstance.post("/forgot-password", {email: modal.forgotPasswordMail})
            .then(async (res) => {
            
            if (res.status === 200) {
                setToast('dismiss', '', setModal)
                setModal( modal => ({
                    ...modal,
                    forgotPasswordMailSent: true,
                }));
            }
            })
            .catch((error) => {
                setToast('dismiss', '', setModal);
                setToast('error', 'Unable to send password reset link, please try again', setModal)
            })
    }

    const backToLogin = () => {
        setModal( modal => ({
            ...modal,
            forgotPasswordMailSent: false,
            signInModal: true,
        }));
    }

  return (
    <>
        { modal.forgotPasswordMailSent && (
            <ModalLayout> 
                <div className='flex flex-col items-center'>
                    <h1 className='text-primary text-xl font-semibold w-max'> Check your email </h1>

                    <Image src={mailSent} alt='Email Sent' width={200} height={150} loading='lazy' />

                    <p className='text-center'> A reset link has been sent to your <span className='font-semibold'> {modal.forgotPasswordMail} </span> inbox. Please check your spam or promotions folder if you can&apos;t find it in your inbox.</p>

                    <p className='text-sm font-semibold text-center pt-3 mt-1 border-t w-full'> 
                        Didn&apos;t receive?
                        <span className='text-primary cursor-pointer font-semibold ml-2'
                            onClick={resend}
                        > Resend </span> 
                    </p> 

                    <button type='button' className='text-primary underline cursor-pointer font-semibold mt-2' onClick={backToLogin}> Go back to login screen </button>
                </div>
            </ModalLayout>
        ) }
    </>
  )
}

export default ForgotPasswordSuccess