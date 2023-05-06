import { useRecoilState } from 'recoil'
import { layoutState } from '../../../states'
import ModalLayout from './modal-layout';
import Image from 'next/image';
import mailSent from '../../../public/assets/mailSent.webp'

const ForgotPasswordSuccess = () => {
    const [modal, setModal] = useRecoilState(layoutState);

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

                    <p className='text-center'> A reset link has been sent to your <span className='font-semibold'> {modal.forgotPasswordMail} </span> inbox. If you don&apos;t see our email in your inbox, please check your spam or promotions folder as it may have been filtered there.</p>

                    <button type='button' className='text-primary underline cursor-pointer font-semibold mt-2' onClick={backToLogin}> Go back to login screen </button>
                </div>
            </ModalLayout>
        ) }
    </>
  )
}

export default ForgotPasswordSuccess