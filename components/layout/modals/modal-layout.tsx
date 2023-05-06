import { AiOutlineClose } from 'react-icons/ai'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { ILayoutState, layoutState } from '../../../states'
import { IModalLayoutProps } from '../../../types'
import Image from 'next/image'
import logo from "../../../public/assets/logo.webp";

const ModalLayout: React.FC<IModalLayoutProps> = ({heading, children, signIn, signUp}) => {
    const [modal, setModal] = useRecoilState(layoutState);
    const closeModal = useResetRecoilState(layoutState)

    const { signInModal, signUpModal, forgotPasswordModal, forgotPasswordMailSent, verifyEmailMailSent, editProfileModal, changePasswordModal, clearConfirmationModal } = modal
    const modals = signInModal || signUpModal || forgotPasswordModal || forgotPasswordMailSent || verifyEmailMailSent || editProfileModal || changePasswordModal || clearConfirmationModal

    const openOppModal = () => {
        setModal( modal => ({
            ...modal,
            [signIn ? 'signInModal' : 'signUpModal' as keyof ILayoutState]: false,
            [signIn ? 'signUpModal' : 'signInModal' as keyof ILayoutState]: true,
        }));
    }

  return (
    <div className={`max-h-[calc(100vh-80px)] top-[calc(50%+20px)] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md w-[calc(100%-32px)] ft:w-[320px] z-[25] ${modals ? 'fixed' : 'hidden'}`}>
        <div className="relative pt-6">
            <AiOutlineClose size={20} className='absolute top-0 right-0 text-primary cursor-pointer' onClick={closeModal} />
            <div className='absolute top-[-56px] left-[50%] translate-x-[-50%] w-[75px] h-[75px] rounded-full overflow-hidden bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] flex items-center justify-center'>
                <Image src={logo} alt="logo" width={60} height={47} priority />
            </div>

            <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
                <h5 className='font-semibold text-center'> {heading} </h5>

                { children }

                { signIn || signUp ? (
                    <p className='text-sm font-semibold text-center pt-3 mt-3 border-t'> 
                        { signIn ? "Don't have an account?" : 'Have an account?' } 
                        <span 
                            className='text-primary cursor-pointer font-semibold ml-2'
                            onClick={openOppModal}
                        > 
                            { signIn ? 'Create an Account' : 'Log in' }
                        </span> 
                    </p> 
                ) : null}
            </div>
        </div>
    </div>
  )
}

export default ModalLayout