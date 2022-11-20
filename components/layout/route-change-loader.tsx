import React from 'react'
import Image from 'next/image'
import Logo from '../../public/assets/logo2.webp';
import { Loader } from '../loader';

const RouteChangeLoader = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-10 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-50'>
      <div className="relative w-[250px] h-[70px] animate-ping-slow">
        <Image src={Logo} alt='logo' layout='fill' priority />
      </div>
      
      <Loader />
    </div>
  )
}

export default RouteChangeLoader