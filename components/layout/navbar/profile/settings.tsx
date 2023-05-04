import { AiOutlineSetting, AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'
import { ILayoutState, layoutState } from '../../../../states'

const Settings = () => {
    const setModal = useSetRecoilState(layoutState);
    const showModal = (name: string) => {
        setTimeout(() => {
            setModal( modal => ({
                ...modal,
                profileDropdown: false,
                [name as keyof ILayoutState]: true,
            }))
        }, 0);
    }

  return (
    <>
        <button type='button' className='dropdownLinks hover:bg-transparent cursor-default items-center'>
            <div className='flex'> <AiOutlineSetting size={23} className='mr-1' /> Settings </div>
        </button>
        
        <div className='ml-5'>
            <button type='button' className='dropdownLinks' onClick={() => showModal('editProfileModal')}>
                <AiOutlineUser size={23} className='mr-1' /> Edit Profile
            </button>

            <button type='button' className='dropdownLinks' onClick={() => showModal('changePasswordModal')}>
                <AiOutlineLock size={23} className='mr-1' /> Change Password
            </button>
        </div>
    </>
  )
}

export default Settings