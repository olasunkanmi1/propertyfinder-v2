import React from 'react'
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states';
import Link from 'next/link';
import Profile from './navbar/profile';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();

    const [open, setOpen] = useRecoilState(navbarState);
    const { isSidebarOpen } = open;
    const navLinks = [
        { route: '/find-property', title: 'Find Property', active: router.pathname === '/find-property' && !router.query.purpose },
        { route: '/find-property?purpose=for-sale', title: 'For Sale', active: router.query.purpose === 'for-sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent', active: router.query.purpose === 'for-rent' },
    ]

    const closeSidebar = (name: string) => {
        setOpen(open => ({
            ...open,
            isSidebarOpen: false
        }));

        if(name === 'in') {
            setOpen(open => ({
                ...open,
                signInModal: true
            }));
        } else if(name === 'out') {
            // logout
        }
    };


  return (
    <div className={`md:hidden fixed top-[75px] z-10 w-full ms:w-[300px] h-[calc(100vh-75px)] overflow-auto duration-500 ease-in-out bg-[#fefefe] p-3 pb-[100px]  space-y-5 ${isSidebarOpen ? 'right-0' : '-right-[100%] ms:-right-[300px]'}`}>
        <Profile mobile />

        <div className='flex flex-col justify-between h-[calc(100%-100px)] min-h-[280px]'>
            <div>
                { navLinks.map(({ route, title, active }) => {
                    return (
                        <Link href={route} passHref key={route}>
                            <a className={`sidebarNavLinks ${active ? 'bg-primary text-white' : ''}`} onClick={() => closeSidebar('')}> { title } </a>
                        </Link>
                    )
                }) }

                    <Link href='/saved-properties' passHref>
                        <a className={`sidebarNavLinks ${router.pathname === '/saved-properties' ? 'bg-primary text-white' : ''}`} onClick={() => closeSidebar('')}> Saved Properties </a>
                    </Link>
            </div>

                <button className='sidebarNavLinks' onClick={() => closeSidebar('in')}> <BsBoxArrowRight size={25} /> Sign In </button>
                <button className='sidebarNavLinks' onClick={() => closeSidebar('out')}> Sign Out </button>
        </div>
    </div>
  )
}

export default Sidebar;