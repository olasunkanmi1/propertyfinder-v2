import React from 'react'
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil'
import { navbarState } from '../../states/navbarAtom';
import Link from 'next/link';
import Profile from './navbar/profile';
import { BsBoxArrowRight } from 'react-icons/bs';

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [sidebarOpen, setSidebarOpen] = useRecoilState(navbarState);
    const { isSidebarOpen } = sidebarOpen;
    const navLinks = [
        { route: '/find-property', title: 'Find Property' },
        { route: '/find-property?purpose=for-sale', title: 'For Sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent' },
        { route: '/saved-properties', title: 'Saved Properties' },
    ]


  return (
    <div className={`fixed top-[75px] z-20 w-full ms:w-[300px] h-[calc(100vh-75px)] min-h-[335px] overflow-scroll duration-500 ease-in-out bg-[#fefefe] p-3 space-y-5 ${isSidebarOpen ? 'right-0' : '-right-[100%] ms:-right-[300px]'}`}>
        <Profile imageUrl='' firstName='Salam' email='ad@kf.com' big />

        <div className='flex flex-col justify-between'>
            <div className='flex flex-col'>
                { navLinks.map(({ route, title }) => {
                    return (
                        <Link href={route} passHref key={route}>
                            <a className="sidebarNavLinks"> { title } </a>
                        </Link>
                    )
                }) }
            </div>

            { session ? (
                <button className='sidebarNavLinks absolute bottom-3'>
                    Sign Out
                </button>
            ) : (
                <Link href='/auth' passHref>
                    <a className="sidebarNavLinks absolute bottom-3 w-[calc(100%-24px)]"> <BsBoxArrowRight size={25} /> Sign In </a>
                </Link>
            ) }
        </div>
    </div>
  )
}

export default Sidebar;