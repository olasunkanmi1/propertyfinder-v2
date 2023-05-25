import Image from 'next/image';
import { useRecoilState } from 'recoil'
import ModalLayout from './modal-layout';
import { layoutState } from '@states'
import {mailSent} from '@public'
import { resend } from '@utils';

const ForgotPasswordSuccess = () => {
    const [modal, setModal] = useRecoilState(layoutState);

    const handleSwitch = (key: string) => {
        setModal( modal => ({
            ...modal,
            forgotPasswordMailSent: false,
            [key]: true,
        }));
    }

  return (
    <>
        { modal.forgotPasswordMailSent && (
            <ModalLayout> 
                <div className='flex flex-col items-center'>
                    <h1 className='text-primary text-xl font-semibold w-max'> Check your email </h1>

                    <Image src={mailSent} alt='Email Sent' width={200} height={150} loading='lazy' />

                    <p className='text-center'> A reset link has been sent to your <br /> <span className='font-semibold whitespace-normal break-all'> {modal.forgotPasswordMail.toLowerCase()} </span> <br /> inbox. Please check your spam or promotions folder if you can&apos;t find it in your inbox.</p>

                    <div className='flex justify-between space-x-2 pt-3 mt-1 border-t w-full text-sm font-semibold'>
                        <p className='text-center'> 
                            Didn&apos;t receive?
                            <span className='text-primary cursor-pointer ml-2'
                                onClick={() => resend(modal.forgotPasswordMail, setModal)}
                            > Resend </span> 
                        </p> 

                        <span className='text-primary cursor-pointer'
                            onClick={() => handleSwitch('forgotPasswordModal')}
                        > Change Email </span> 
                    </div>


                    <button type='button' className='text-primary underline cursor-pointer font-semibold mt-2' onClick={() => handleSwitch('signInModal')}> Go back to login screen </button>
                </div>
            </ModalLayout>
        ) }
    </>
  )
}

export default ForgotPasswordSuccess