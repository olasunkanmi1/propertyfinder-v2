import React from 'react'
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states/navbarAtom';
import Link from 'next/link';
import Profile from './navbar/profile';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();

    const { data: session, status } = useSession();
    const [sidebarOpen, setSidebarOpen] = useRecoilState(navbarState);
    const { isSidebarOpen } = sidebarOpen;
    const navLinks = [
        { route: '/find-property', title: 'Find Property', active: router.pathname === '/find-property' && !router.query.purpose },
        { route: '/find-property?purpose=for-sale', title: 'For Sale', active: router.query.purpose === 'for-sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent', active: router.query.purpose === 'for-rent' },
        { route: '/saved-properties', title: 'Saved Properties', active: router.pathname === '/saved-properties' },
    ]

    const closeSidebar = () => {
        setSidebarOpen(sidebarOpen => ({
            ...sidebarOpen,
            isSidebarOpen: false
        }));
    };


  return (
    <div className={`fixed top-[75px] z-10 w-full ms:w-[300px] h-[calc(100vh-75px)] overflow-auto duration-500 ease-in-out bg-[#fefefe] p-3 pb-10  space-y-5 ${isSidebarOpen ? 'right-0' : '-right-[100%] ms:-right-[300px]'}`}>
        <Profile imageUrl='' firstName='Salam' email='ad@kf.com' big />

        <div className='flex flex-col justify-between h-[calc(100%-70px)] min-h-[243px]'>
            <div>
                { navLinks.map(({ route, title, active }) => {
                    return (
                        <Link href={route} passHref key={route}>
                            <a className={`sidebarNavLinks ${active && 'bg-primary text-white'}`} onClick={closeSidebar}> { title } </a>
                        </Link>
                    )
                }) }
            </div>

            { session ? (
                <button className='sidebarNavLinks' onClick={closeSidebar}> Sign Out </button>
            ) : (
                <Link href='/authentication' passHref>
                    <a className={`sidebarNavLinks ${router.pathname === '/authentication' && 'bg-primary text-white'}`} onClick={closeSidebar}> <BsBoxArrowRight size={25} /> Sign In </a>
                </Link>
            ) }
        </div>
    </div>
  )
}

export default Sidebar;