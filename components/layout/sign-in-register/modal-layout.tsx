import React, {useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../../states'
import { IModalLayoutProps, SignInInitialValues } from '../../../types'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from "../../../public/assets/logo.png";
import { Loader } from '../../loader'
import { Form, Formik, FormikErrors } from 'formik'

const ModalLayout: React.FC<IModalLayoutProps> = ({heading, children, signIn}) => {
    const router = useRouter();
    const [modal, setModal] = useRecoilState(navbarState);
    const closeModal = () => {
        setModal( modal => ({
            ...modal,
            signInModal: false,
        }))
    }

    

  return (
    <div className={`top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md w-[calc(100%-32px)] ms:w-[295px] ${modal.signInModal ? 'fixed' : 'hidden'}`}>
        <div className="relative pt-5">
            <AiOutlineClose size={20} className='absolute top-0 right-0 text-primary cursor-pointer' onClick={closeModal} />

            <div className='absolute top-[-56px] left-[50%] translate-x-[-50%] w-[75px] h-[75px] rounded-full overflow-hidden bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] flex items-center justify-center'>
                <Image src={logo} alt="logo" width={65} height={30} priority />
            </div>

            <h5 className='font-semibold text-center'> {heading} </h5>

            { children }


            <p className='text-xs font-semibold text-center pt-3 border-t'> 
                { signIn ? "Don't have an account?" : 'Have an account?' } 
                <span 
                    className='text-primary cursor-pointer font-semibold ml-2'
                > 
                    { signIn ? 'Create an Account' : 'Log in' }
                </span> 
            </p>
        </div>
    </div>
  )
}

export default ModalLayout