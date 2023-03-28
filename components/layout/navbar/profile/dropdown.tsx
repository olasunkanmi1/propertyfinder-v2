import Link from 'next/link'
import { toast } from "react-toastify";
import { AiOutlineHeart } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../../../states'
import Settings from './settings'

const Dropdown = () => {
  const [user, setUser] = useRecoilState(userState);

    const firstName = user ? user.firstName : ''
    const lastName = user ? user.lastName : ''
    const email = user ? user.email : ''

    const logOut = () => {
        axios.get("auth/logout", { withCredentials: true })
      .then(async (res) => {
        
        if (res.status === 200) {
          toast.success('Logged out successfully');
            setUser(null)
        }
      })
      .catch((error) => {
        toast.error('Unknown error, please try again');
      })
    }

  return (
    <div className="flex flex-col items-start absolute right-0 top-[74px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-md py-2 z-20 bg-white w-[250px] cursor-default">
        <div className='px-2 pb-1 overflow-hidden w-full border-b bg-white'>
            <h6 className='font-semibold select-none text-ellipsis truncate'> {firstName} {lastName} </h6>
            <p className='text-xs break-words'> {email} </p>
        </div>

        <div className='px-2 py-1 overflow-hidden w-full border-b bg-white'>
            <Link href="/saved-properties" passHref>
                <a className='dropdownLinks'>
                    <AiOutlineHeart size={23} className='mr-1' /> View Saved Properties 
                </a>
            </Link>
            
            <Settings />
        </div>

        <button onClick={logOut} className='dropdownLinks mx-2 mt-1 w-[calc(100%-16px)]'> 
            <FiLogOut size={23} className='mr-1' /> Log Out 
        </button>
    </div>
  )
}
export default Dropdown