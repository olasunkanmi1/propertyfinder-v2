import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Skeleton from 'react-loading-skeleton'
import Hamburger from './hamburger'
import 'react-loading-skeleton/dist/skeleton.css'
import Profile from './profile'
import { layoutState, loadingState, userState } from '@states';
import { ILayoutState } from '@types';
import {logo} from '@public'

const Navbar = () => {
  const loading = useRecoilValue(loadingState);
  const user = useRecoilValue(userState);
  const setModal = useSetRecoilState(layoutState);

  const {userLoading} = loading;
  const router = useRouter();

    const navLinks = [
        { route: '/find-property', title: 'Find Property', isActive: router.route === '/find-property' && !router.query.purpose },
        { route: '/find-property?purpose=for-sale', title: 'For Sale', isActive: router.route === '/find-property' && router.query.purpose === 'for-sale' },
        { route: '/find-property?purpose=for-rent', title: 'For Rent', isActive: router.route === '/find-property' && router.query.purpose === 'for-rent' }
    ];

    const showModal = (name: string) => {
        setModal( modal => ({
            ...modal,
            [name as keyof ILayoutState]: true,
        }))
    }

  return (
    <div className='flex justify-between items-center xl:w-[1152px] border-b h-[75px] sticky top-0 bg-[#fefefe] z-[22]'>
        <Link href="/" passHref>
            <a className='h-[60px]'> <Image src={logo} alt="logo" width={75} height={60} priority /> </a>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
            { navLinks.map(({ route, title, isActive }) => {
                return (
                    <Link href={route} passHref key={route}>
                        <a className={`navLinks ${isActive ? 'text-primary font-semibold' : ''}`}> { title } </a>
                    </Link>
                )
            }) }

            { userLoading ? (
                <>
                    <Skeleton width={40} />
                    <Skeleton circle width={40} height={40} />
                </>
            ) : !userLoading && !user ? (
                <>
                    <button className="navLinks" onClick={() => showModal('signInModal')}> Sign In </button>
                    <button className="registerBtn btnAnimation" onClick={() => showModal('signUpModal')}> Register </button>
                </>
            ) : (
                <Profile />
            )}
        </div>

        <Hamburger />
    </div>
  )
}

export default Navbar