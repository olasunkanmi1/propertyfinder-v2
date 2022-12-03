import React from 'react'
import Image from 'next/image'
import { IProfileProps } from '../../../types'
import { AiOutlineUp } from 'react-icons/ai'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../../states'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Profile: React.FC<IProfileProps> = ({mobile}) => {
    const { data: session } = useSession();
    const imageUrl = session ? session.user?.image : '';
    const firstName = session ? session.user?.firstName : '';
    const email = session ? session.user?.email : '';
    console.log(session)

    const [dropdown, setDropdown] = useRecoilState(navbarState);
    const handleDropdown = () => {
        setDropdown(dropdown => ({
            ...dropdown,
            profileDropdown: !dropdown.profileDropdown, 
        }))
    }

  return (
    <div className='flex space-x-2 items-center cursor-pointer text-gray-500' onClick={handleDropdown}>
        <div className={`flex items-center justify-center bg-secondary text-white rounded-full relative ${mobile ? 'w-[50px] h-[50px]' : 'w-[40px] h-[40px]'}`}>
            { imageUrl && <Image src={imageUrl} alt='dp' layout='fill' priority className='rounded-full border' /> }
        </div>

        {mobile ? (
            <div className='overflow-hidden w-[calc(100%-55px)]'>
                <h6 className='font-semibold select-none text-ellipsis truncate'> {firstName} </h6>
                <p className='text-sm break-words'> {email} </p>
            </div> 
        ) : (
            <AiOutlineUp className={`transition-all duration-300 ${dropdown.profileDropdown ? '' : '-rotate-180'}`} />
        )}


        { dropdown.profileDropdown && (
            <div className="flex flex-col items-start absolute right-0 top-[74px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-md py-2 z-20 bg-white space-y-2 max-w-[250px]">
                <div className='px-2 overflow-hidden w-full'>
                    <h6 className='font-semibold select-none text-ellipsis truncate'> {firstName} </h6>
                    <p className='text-sm break-words'> {email} </p>
                </div>

                <Link href="/saved-properties" passHref>
                    <a className='text-center p-2 hover:text-white hover:bg-primary w-full'>
                        View saved properties 
                    </a>
                </Link>

                <button onClick={() => signOut()} className='bg-primary bg-opacity-20 border border-primary text-primary py-1 px-4 hover:scale-105 transition-all duration-500 rounded-md font-medium mx-auto'> Sign out </button>
            </div>
        ) }
    </div>
  )
}

export default Profile