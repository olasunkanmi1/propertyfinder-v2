import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const SignUpModal = () => {
  return (
    <div className='fixed top-[50%] left-[50%] translate-x-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md space-y-4'>
        <h1 className='font-semibold text-center'> SIGN IN </h1>

        <button className='flex items-center border rounded-full py-4 px-5 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] font-medium text-xl'> 
         <FcGoogle size={30} className='mr-3' /> Sign in with google 
        </button>
    </div>
  )
}

export default SignUpModal