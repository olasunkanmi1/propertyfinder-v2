import { useRecoilValue } from 'recoil'
import { navbarState, userState } from '../../../states'
import ModalLayout from './modal-layout';
import Image from 'next/image';
import mailSent from '../../../public/assets/mailSent.webp'

const VerifyEmailSuccess = () => {
    const user = useRecoilValue(userState);
    const modal = useRecoilValue(navbarState);

    return (
        <>
            { modal.verifyEmailMailSent && (
                <ModalLayout> 
                    <div className='flex flex-col items-center'>
                        <h1 className='text-primary text-xl font-semibold w-max'> Check your email </h1>

                        <Image src={mailSent} alt='Email Sent' width={200} height={150} loading='lazy' />

                        <p className='text-center'> A verification link has been sent to your <span className='font-semibold'> {user?.email} </span> inbox. </p>
                    </div>
                </ModalLayout>
            ) }
        </>
    )
}

export default VerifyEmailSuccess