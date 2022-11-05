import React from 'react'
import Image from 'next/image'
import { ProfileProps } from '../../../types'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import Link from 'next/link'

const Profile: React.FC<ProfileProps> = ({imageUrl, firstName, email, big}) => {
  return (
    <div className='flex space-x-2 items-center cursor-pointer text-gray-500'>
        <div className={`flex items-center justify-center bg-secondary text-white rounded-full relative ${big ? 'w-[50px] h-[50px]' : 'w-[20px] h-[20px]'}`}>
            { imageUrl ? (
                <Image src={imageUrl} alt='dp' layout='fill' priority className='rounded-full border' />
            ) : (
                <p className='text-white text-2xl font-bold '> {firstName.charAt(0)} </p>
            ) }
        </div>

        <div className="flex flex-col">
            <h6> {firstName} </h6>
            <p className='font-sm'> {email} </p>
        </div>

        {/* { dropdownOpen ? <AiOutlineUp /> : <AiOutlineDown /> } */}

        {/* { dropdownOpen && ( */}
            {/* <div className="flex flex-col absolute right-0 top-[75px] border rounded-md p-2 z-20 bg-white">
                <Link href="/saved-properties" passHref>
                    <a className='hover:text-primary'>
                        View saved properties 
                    </a>
                </Link>

                <button type='button' className='hover:text-primary'> Sign out </button>
            </div> */}
        {/* // ) } */}
    </div>
  )
}

export default Profile