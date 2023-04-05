import React from 'react'
import Image from 'next/image'
import { IProfileProps } from '../../../../types'
import { AiOutlineUp } from 'react-icons/ai'
import Link from 'next/link'
import { useRecoilState, useRecoilValue } from 'recoil'
import { navbarState, userState } from '../../../../states'
import Dropdown from './dropdown'

const Profile: React.FC<IProfileProps> = ({mobile}) => {
  const user = useRecoilValue(userState);
    const [dropdown, setDropdown] = useRecoilState(navbarState);

    const firstName = user ? user.firstName : ''
    const lastName = user ? user.lastName : ''
    const email = user ? user.email : ''
    const photoUrl = user ? user.photoUrl : ''

    const handleDropdown = () => {
        if(!mobile) {
            setDropdown(dropdown => ({
                ...dropdown,
                profileDropdown: !dropdown.profileDropdown, 
            }))
        }
    }

  return (
    <div className='flex space-x-2 items-center cursor-pointer text-gray-500' onClick={handleDropdown}>
        <div className={`flex items-center justify-center bg-secondary text-white font-bold rounded-full overflow-hidden relative ${mobile ? 'w-[50px] h-[50px]' : 'w-[35px] h-[35px]'}`}>
            { photoUrl ? (
                <Image src={photoUrl} alt="display picture" layout='fill' loading='lazy' />
            ) : (
                <> {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()} </>
            ) }
        </div>

        {mobile ? (
            <div className='overflow-hidden w-[calc(100%-55px)]'>
                <h6 className='font-semibold select-none text-ellipsis truncate'> {firstName} {lastName} </h6>
                <p className='text-sm break-words'> {email} </p>
            </div> 
        ) : (
            <>
                <p> {firstName} </p>
                <AiOutlineUp className={`transition-all duration-300 ${dropdown.profileDropdown ? '' : '-rotate-180'}`} />
            </>
        )}


        { dropdown.profileDropdown && <Dropdown />}
    </div>
  )
}

export default Profile