import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states'
import { signIn } from 'next-auth/react';
import { ISignUpModalProps } from '../../types'
import { useRouter } from 'next/router'

const SignUpModal: React.FC<ISignUpModalProps> = ({providers}) => {
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
    <div className={`top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md ${modal.signInModal ? 'fixed' : 'hidden'}`}>
        <div className="relative">
            <AiOutlineClose size={20} className='absolute top-0 right-0 text-primary cursor-pointer' onClick={closeModal} />
            <h1 className='font-semibold text-center'> SIGN IN </h1>

            {providers && Object.values(providers).map((provider) => (
                <button 
                    key={provider.name} 
                    className='flex items-center border rounded-full py-4 px-5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] font-medium text-xl mt-4 hover:bg-slate-50'
                    onClick={() => signIn(provider.id, { callbackUrl: router.asPath })}
                > 
                    <FcGoogle size={30} className='mr-3' /> Sign in with {provider.id} 
                </button>
            ))}

        </div>
    </div>
  )
}

export default SignUpModal