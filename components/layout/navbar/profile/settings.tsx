import { AiOutlineSetting, AiOutlineUser, AiOutlineLock } from 'react-icons/ai'

const Settings = () => {

  return (
    <>
        <button type='button' className='dropdownLinks hover:bg-transparent cursor-default items-center'>
            <div className='flex'> <AiOutlineSetting size={23} className='mr-1' /> Settings </div>
        </button>
        
        <div className='ml-5'>
            <button type='button' className='dropdownLinks'>
                <AiOutlineUser size={23} className='mr-1' /> Edit Profile
            </button>

            <button type='button' className='dropdownLinks'>
                <AiOutlineLock size={23} className='mr-1' /> Change Password
            </button>
        </div>
    </>
  )
}

export default Settings