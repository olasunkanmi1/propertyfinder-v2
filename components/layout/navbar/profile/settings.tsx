import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'
import { layoutState } from '@states'
import { ILayoutState } from '@types'

const Settings = () => {
    const setModal = useSetRecoilState(layoutState);
    const showModal = (name: string) => {
        setTimeout(() => {
            setModal( modal => ({
                ...modal,
                [name as keyof ILayoutState]: true,
            }))
        }, 0);
    }

  return (
    <div className='mt-2'>
        <button type='button' className='dropdownLinks' onClick={() => showModal('editProfileModal')}>
            <AiOutlineUser size={23} className='mr-1' /> Edit Profile
        </button>

        <button type='button' className='dropdownLinks' onClick={() => showModal('changePasswordModal')}>
            <AiOutlineLock size={23} className='mr-1' /> Change Password
        </button>
    </div>
  )
}

export default Settings