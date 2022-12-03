import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/assets/logo.png'
import Profile from './profile'
import { useSession } from 'next-auth/react';
import Hamburger from './hamburger'
import { useSetRecoilState } from 'recoil';
import { navbarState } from '../../../states';

const Navbar = () => {
  const setModal = useSetRecoilState(navbarState);

    const { data: session, status } = useSession();
    const navLinks = [
        { route: '/find-property', title: 'Find Property' },
        { route: '/find-property?purpose=for-sale', title: 'For Sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent' }
    ];

    const showModal = () => {
        setModal( modal => ({
            ...modal,
            signInModal: true,
        }))
    }

  return (
    <div className='flex justify-between items-center xl:w-[1152px] border-b h-[75px] sticky top-0 bg-[#fefefe] z-[22]'>
        <Link href="/" passHref>
            <a> <Image src={Logo} alt="logo" width={180} height={50} priority /> </a>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
            { navLinks.map(({ route, title }) => {
                return (
                    <Link href={route} passHref key={route}>
                        <a className="navLinks"> { title } </a>
                    </Link>
                )
            }) }

            { status === 'loading' ? null : !session ? (
                <button className="navLinks" onClick={showModal}> Sign In </button>
            ) : (
                <Profile />
            ) }
        </div>

        <Hamburger />
    </div>
  )
}

export default Navbar