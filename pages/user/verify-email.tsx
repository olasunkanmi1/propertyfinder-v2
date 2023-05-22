import {useEffect} from 'react'
import Head from 'next/head'
import Image from "next/image"
import {useRouter} from 'next/router';
import { useRecoilState } from 'recoil';
import {logo, success, error} from '@public'
import { verifyEmailGSSP } from '@utils';
import { IVerifyEmail } from '@types';
import { userState } from '@states';

const VerifyEmail: React.FC<IVerifyEmail> = ({isVerified, samePersonLoggedIn}) => {
  const [user, setUser] = useRecoilState(userState)
    const router = useRouter();

    useEffect(() => {
      if(samePersonLoggedIn && user) {
        setUser({
          ...user,
          isVerified: true
        })
      }
    }, [samePersonLoggedIn, setUser, user])

  return (
      <div className='max-h-[calc(100vh-80px)] top-[calc(50%+20px)] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-4 bg-white rounded-md w-[calc(100%-32px)] ms:w-[295px] z-[25] fixed'>
          <Head>
            <title>Verify your email address - PropertyFinder</title>
            <meta name="desciption" content="Find your dream property" />
          </Head>

          <div className="relative pt-6">
              <div className='absolute top-[-56px] left-[50%] translate-x-[-50%] w-[75px] h-[75px] rounded-full overflow-hidden bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] flex items-center justify-center'>
                  <Image src={logo} alt="logo" width={60} height={47} priority />
              </div>
              
              <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
                <div className='flex flex-col items-center'>
                  <h1 className={`text-xl font-semibold text-center ${isVerified ? 'text-primary' : 'text-[#E65050]'}`}> {isVerified ? 'Email verified successfully' : 'Unable to verify your email'} </h1>
                  <Image src={isVerified ? success : error} alt='Email Sent' width={180} height={150} loading='lazy' />
                  <button type='button' className='text-primary underline cursor-pointer font-semibold mt-2' onClick={() => router.push('/')}> Proceed to Home </button>
                </div>
              </div>
          </div>

      </div>
  )
}

export default VerifyEmail

export const getServerSideProps = verifyEmailGSSP;