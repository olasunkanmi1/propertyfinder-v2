import Link from 'next/link'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { GoVerified, GoUnverified } from "react-icons/go";
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userState, propertiesState, layoutState } from '../../../../states'
import { sendVerificationEmail } from '../../../../utils/sendVerificationEmail'
import { logOut } from '../../../../utils/logOut'
const Settings = dynamic(() => import('./settings')) 

const Dropdown = () => {
  const [user, setUser] = useRecoilState(userState);
  const setProperties = useSetRecoilState(propertiesState);
  const [modal, setModal] = useRecoilState(layoutState);
  const router = useRouter();

  const firstName = user ? user.firstName : ''
  const lastName = user ? user.lastName : ''
  const email = user ? user.email : ''
  const isVerified = user ? user.isVerified : ''

  const closeDropdown = () => setModal(modal => ({...modal, profileDropdown: false}))

  return (
    <>
      { modal.profileDropdown && (
        <div className="flex flex-col items-start absolute right-0 top-[74px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-md py-2 z-20 bg-white w-[250px] cursor-default" onClick={closeDropdown}>
            <div className='px-2 pb-1 overflow-hidden w-full border-b bg-white'>
                <h6 className='font-semibold select-none text-ellipsis truncate'> {firstName} {lastName} </h6>
                <p className='text-sm break-words'> {email} </p>
                <div onClick={() => !isVerified ? sendVerificationEmail(email, setModal) : null} className={`flex items-center px-3 py-[1px] text-sm font-semibold rounded-full w-max ease-in-out duration-500 mt-1 ${isVerified ? 'text-green-700 bg-green-300' : 'text-red-500 bg-red-200 hover:bg-red-300 cursor-pointer'}`}> 
                  {isVerified ? (
                    <> <GoVerified size={15} className='mr-1' /> Verified </>
                  ) : (
                    <> <GoUnverified size={15} className='mr-1' /> Not verified. Click to verify </>
                  )}  
                </div> 
            </div>

            <div className='px-2 py-1 overflow-hidden w-full border-b bg-white'>
                <Link href="/saved-properties" passHref>
                    <a className='dropdownLinks'>
                        <AiOutlineHeart size={23} className='mr-1' /> View Saved Properties 
                    </a>
                </Link>
                
                <Settings />
            </div>

            <button onClick={() => logOut(setModal, router, setUser, setProperties)} className='dropdownLinks mx-2 mt-1 w-[calc(100%-16px)]'> 
                <FiLogOut size={23} className='mr-1' /> Log Out 
            </button>
        </div>
      ) }
    </>
  )
}

export default Dropdown