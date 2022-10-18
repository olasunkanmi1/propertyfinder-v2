import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/assets/logo.png'
import Profile from './profile'
import { useRecoilState } from 'recoil'
import { dropdownState } from '../../../states/dropdownAtom'
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session, status } = useSession();
    // const session = true;
    const [dropdownOpen, setDropdownOpen] = useRecoilState(dropdownState)

  return (
    <div className='flex justify-between items-center w-full xl:w-[1152px] border-b h-[75px] fixed top-0 bg-[#fefefe] z-10 mx-4 sm:mx-8 overflow-hidden'>
        <Link href="/" passHref>
            <a>
                <Image src={Logo} alt="logo" width={180} height={50} />
            </a>
        </Link>

        <div className="flex items-center space-x-4">
            <Link href="/find-property" passHref>
                <a className="navLinks">Find Property</a>
            </Link>

            <Link href="/find-property?purpose=for-sale" passHref>
                <a className="navLinks">For Sale</a>
            </Link>

            <Link href="/find-property?purpose=for-rent" passHref>
                <a className="navLinks">For Rent</a>
            </Link>

            { !session ? (
            <Link href="/auth" passHref>
                <a className="navLinks">Sign In</a>
            </Link>
            ) : (
                <Profile imageUrl='' firstName='Salam' email='ad@kf.com' dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
            ) }
        </div>
    </div>
  )
}

export default Navbar