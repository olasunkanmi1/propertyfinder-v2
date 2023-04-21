import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { navbarState, loadingState, userState, INavbarState } from '../../states';
import Link from 'next/link';
import Profile from './navbar/profile';
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { toast } from "react-toastify";

const Sidebar = () => {
    const loading = useRecoilValue(loadingState);
    const [user, setUser] = useRecoilState(userState);
    const [open, setOpen] = useRecoilState(navbarState);

    const router = useRouter();
    const {userLoading} = loading;
    const { isSidebarOpen } = open;

    const navLinks = [
        { route: '/find-property', title: 'Find Property', active: router.pathname === '/find-property' && !router.query.purpose },
        { route: '/find-property?purpose=for-sale', title: 'For Sale', active: router.query.purpose === 'for-sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent', active: router.query.purpose === 'for-rent' },
    ]

    const closeSidebar = (name: string) => {
        if(name === 'out') {
            axios.delete("/logout", { withCredentials: true })
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

        setOpen(open => ({
            ...open,
            isSidebarOpen: false,
            [name as keyof INavbarState]: true,
        }));
    };

  return (
    <div className={`md:hidden fixed top-[75px] z-10 w-full ms:w-[300px] h-[calc(100vh-75px)] overflow-auto duration-500 ease-in-out bg-[#fefefe] p-3 pb-[100px]  space-y-5 ${isSidebarOpen ? 'right-0' : '-right-[100%] ms:-right-[300px]'}`}>
        { user && <Profile mobile /> }

        <div className='flex flex-col justify-between h-[calc(100%-100px)] min-h-[280px]'>
            <div>
                { navLinks.map(({ route, title, active }) => {
                    return (
                        <Link href={route} passHref key={route}>
                            <a className={`sidebarNavLinks ${active ? 'bg-primary text-white' : ''}`} onClick={() => closeSidebar('')}> { title } </a>
                        </Link>
                    )
                }) }

                { userLoading ? null : !userLoading && !user ? (
                    <>
                        <button className='sidebarNavLinks' onClick={() => closeSidebar('signInModal')}> Sign In </button>
                        <button className='sidebarNavLinks' onClick={() => closeSidebar('signUpModal')}> Register </button>
                    </>
                ) : (
                    <>
                        <Link href='/saved-properties' passHref>
                            <a className={`sidebarNavLinks ${router.pathname === '/saved-properties' ? 'bg-primary text-white' : ''}`} onClick={() => closeSidebar('')}> Saved Properties </a>
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