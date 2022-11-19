import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/assets/logo.png'
import Profile from './profile'
import { signIn, signOut, useSession } from 'next-auth/react';
import Hamburger from './hamburger'

const Navbar = () => {
    const { data: session, status } = useSession();
    const navLinks = [
        { route: '/find-property', title: 'Find Property' },
        { route: '/find-property?purpose=for-sale', title: 'For Sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent' },
        { route: '/authentication', title: 'Sign In', session: session },
    ]

  return (
    <div className='flex justify-between items-center  xl:w-[1152px] border-b h-[75px] sticky top-0 bg-[#fefefe] z-[22] overflow-hidden'>
        <Link href="/" passHref>
            <a> <Image src={Logo} alt="logo" width={180} height={50} priority /> </a>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
            { navLinks.map(({ route, title, session }) => {
                return (
                    session === undefined ? (
                        <Link href={route} passHref key={route}>
                            <a className="navLinks"> { title } </a>
                        </Link>
                    ) : session !== undefined && !session ? (
                        <Link href={route} passHref key={route}>
                            <a className="navLinks"> { title } </a>
                        </Link>
                    ) : null
                )
            }) }

            { session && <Profile imageUrl='' firstName='Salam' email='ad@kf.com'/> }
        </div>

        <Hamburger />
    </div>
  )
}

export default Navbar