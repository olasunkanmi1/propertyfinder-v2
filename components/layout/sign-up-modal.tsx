import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states'
import { ISignUpModalProps } from '../../types'
import { useRouter } from 'next/router'

const SignUpModal: React.FC<ISignUpModalProps> = () => {
    const router = useRouter();
    const [modal, setModal] = useRecoilState(navbarState);
    const closeModal = () => {
        setModal( modal => ({
            ...modal,
            signInModal: false,
        }))
    }
    // console.log('providers', providers)

  return (
    <div className={`top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md w-[calc(100%-32px)] ms:w-[295px] ${modal.signInModal ? 'fixed' : 'hidden'}`}>
        <div className="relative">
            <AiOutlineClose size={20} className='absolute top-0 right-0 text-primary cursor-pointer' onClick={closeModal} />
            <h1 className='font-semibold text-center'> SIGN IN </h1>

                <button 
                    className='flex items-center border rounded-full py-4 px-3 ms:px-5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] font-medium ms:text-xl mt-4 mx-auto hover:bg-slate-50'
                    // onClick={() => signIn()}
                > 
                </button>

        </div>
    </div>
  )
}

export default SignUpModal