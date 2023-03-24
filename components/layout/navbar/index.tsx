import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/assets/logo.png'
import Profile from './profile'
import Hamburger from './hamburger'
import { useSetRecoilState } from 'recoil';
import { navbarState, INavbarState } from '../../../states';

const Navbar = () => {
  const setModal = useSetRecoilState(navbarState);

    const navLinks = [
        { route: '/find-property', title: 'Find Property' },
        { route: '/find-property?purpose=for-sale', title: 'For Sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent' }
    ];

    const showModal = (name: string) => {
        setModal( modal => ({
            ...modal,
            [name as keyof INavbarState]: true,
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

                <button className="navLinks" onClick={() => showModal('signInModal')}> Sign In </button>
                <button className="registerBtn" onClick={() => showModal('signUpModal')}> Register </button>
                <Profile />
        </div>

        <Hamburger />
    </div>
  )
}

export default Navbar