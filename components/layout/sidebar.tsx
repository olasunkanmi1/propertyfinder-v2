import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { FiLogOut } from 'react-icons/fi';
import { GoUnverified, GoVerified } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Profile from './navbar/profile';
import { sendVerificationEmail, logOut } from '@utils';
import { layoutState, loadingState, userState, propertiesState } from '@states';
import { ILayoutState } from '@types';

const Sidebar = () => {
    const loading = useRecoilValue(loadingState);
    const [user, setUser] = useRecoilState(userState);
    const [modal, setModal] = useRecoilState(layoutState);
    const setProperties = useSetRecoilState(propertiesState);

    const router = useRouter();
    const {userLoading} = loading;
    const { isSidebarOpen } = modal;

    const navLinks = [
        { route: '/find-property', title: 'Find Property', active: router.pathname === '/find-property' && !router.query.purpose },
        { route: '/find-property?purpose=for-sale', title: 'For Sale', active: router.query.purpose === 'for-sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent', active: router.query.purpose === 'for-rent' },
    ]

    const closeSidebar = (name?: string) => {
        if(name === 'out') logOut(setModal, router, setUser, setProperties)

        setModal(open => ({
            ...open,
            isSidebarOpen: false,
            [name as keyof ILayoutState]: true,
        }));
    };

    const handleVerify = () => {
        closeSidebar();
        if(user) sendVerificationEmail(setModal)
    }

  return (
    <div className={`md:hidden fixed top-[75px] z-10 w-full ms:w-[300px] h-[calc(100vh-75px)] min-h-[280px] overflow-auto duration-500 ease-in-out bg-[#fefefe] p-3 pb-[100px] space-y-3 ${isSidebarOpen ? 'right-0' : '-right-[100%] ms:-right-[300px]'}`}>
        { user && (
            <div className='border-b py-3'>
                <Profile mobile />
        
                <div onClick={() => !user.isVerified ? handleVerify() : null} className={`flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-full ease-in-out duration-500 mt-2 mx-auto w-full ${user.isVerified ? 'text-green-700 bg-green-300' : 'text-red-500 bg-red-200 hover:bg-red-300 cursor-pointer'}`}> 
                    {user.isVerified ? (
                        <> <GoVerified size={15} className='mr-1' /> Email verified </>
                    ) : (
                        <> <GoUnverified size={15} className='mr-1' /> Email not verified. Click to verify </>
                    )}  
                </div> 
            </div>
        ) }

        <div className='flex flex-col justify-between'>
            <div>
                { navLinks.map(({ route, title, active }) => {
                    return (
                            <Link href={route} key={route} className={`sidebarNavLinks ${active ? 'bg-primary text-white' : ''}`} onClick={() => closeSidebar()}> 
                                { title } 
                            </Link>
                    )
                }) }

                { userLoading ? (
                    <>
                        { [...Array(2)].map((arr, i) => <Skeleton key={i} width={200} height={20}  className='ml-3 mt-4' />) }
                    </>
                ) : !userLoading && !user ? (
                    <>
                        <button className='sidebarNavLinks' onClick={() => closeSidebar('signInModal')}> Sign In </button>
                        <button className='sidebarNavLinks' onClick={() => closeSidebar('signUpModal')}> Register </button>
                    </>
                ) : (
                    <>
                        <Link href='/saved-properties' className={`sidebarNavLinks ${router.pathname === '/saved-properties' ? 'bg-primary text-white' : ''}`} onClick={() => closeSidebar('')}> 
                            Saved Properties
                        </Link>
                        
                       <button className='sidebarNavLinks' onClick={() => closeSidebar('editProfileModal')}> Edit Profile </button>
                       <button className='sidebarNavLinks' onClick={() => closeSidebar('changePasswordModal')}> Change Password </button>
                        <button className='sidebarNavLinks' onClick={() => closeSidebar('out')}> <FiLogOut size={25} /> Sign Out </button>
                    </>
                )}

            </div>

        </div>
    </div>
  )
}

export default Sidebar;