import Link from 'next/link'
import {useRouter} from 'next/router'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import Settings from './settings'
import { GoVerified, GoUnverified } from "react-icons/go";
import { userState, propertiesState, layoutState } from '@states'
import { sendVerificationEmail, logOut } from '@utils'

const Dropdown = () => {
  const [user, setUser] = useRecoilState(userState);
  const setProperties = useSetRecoilState(propertiesState);
  const [modal, setModal] = useRecoilState(layoutState);
  const router = useRouter();

  const firstName = user ? user.firstName : ''
  const lastName = user ? user.lastName : ''
  const email = user ? user.email : ''
  const isVerified = user ? user.isVerified : ''

  const closeDropdown = () => setModal(modal => ({...modal, confirmDigitModal: false, profileDropdown: false}))

  return (
    <>
      { modal.profileDropdown && (
        <div className="hidden w-full xl:max-w-6xl px-3 sm:px-8 xl:px-0 md:block md:fixed left-[50%] translate-x-[-50%] top-0 z-[22]">
          <div className=' relative'>
              <div className="flex flex-col items-start absolute right-0 top-[74px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-md py-2 bg-white w-[250px] cursor-default" onClick={closeDropdown}>
                  <div className='px-2 pb-1 overflow-hidden w-full border-b bg-white'>
                      <h6 className='font-semibold select-none text-ellipsis truncate'> {firstName} {lastName} </h6>
                      <p className='text-sm break-words'> {email} </p>
                      <div onClick={() => !isVerified ? sendVerificationEmail(setModal) : null} className={`flex items-center justify-center py-[1px] text-sm font-semibold rounded-full ease-in-out duration-500 mt-1 w-full ${isVerified ? 'text-green-700 bg-green-300' : 'text-red-500 bg-red-200 hover:bg-red-300 cursor-pointer'}`}> 
                        {isVerified ? (
                          <> <GoVerified size={15} className='mr-1' /> Email verified </>
                        ) : (
                          <> <GoUnverified size={15} className='mr-1' /> Email unverified. Click to verify </>
                        )}  
                      </div> 
                  </div>

                  <div className='px-2 py-1 overflow-hidden w-full border-b bg-white'>
                      <Link href="/saved-properties" className={`dropdownLinks ${router.pathname === '/saved-properties' ? 'bg-slate-300' : ''}`}>
                          <AiOutlineHeart size={23} className='mr-1' /> View Saved Properties 
                      </Link>
                      
                      <Settings />
                  </div>

                  <button onClick={() => logOut(setModal, router, setUser, setProperties)} className='dropdownLinks mx-2 mt-1 w-[calc(100%-16px)]'> 
                      <FiLogOut size={23} className='mr-1' /> Log Out 
                  </button>
              </div>
            </div>
        </div>
      ) }
    </>
  )
}

export default Dropdown