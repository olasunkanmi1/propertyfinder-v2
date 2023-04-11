import Head from 'next/head'
import Image from "next/image"
import logo from '../../public/assets/logo.png'
import axios from 'axios'
import {useRouter} from 'next/router';
import success from '../../public/assets/success.webp'
import error from '../../public/assets/error.webp'
import { GetServerSideProps } from 'next';

interface IVerifyEmail {
  isVerified: boolean
}

const VerifyEmail: React.FC<IVerifyEmail> = ({isVerified}) => {
    const router = useRouter();

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

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const {token, email} = query
  let isVerified;

  const obj = {
    verificationToken: token,
    email,
  }
  
  const config = {
    withCredentials: true,
    headers: req.headers.cookie ? {
      Cookie: req.headers.cookie
    } : {
      Cookie: ''
    }
  };

  try {
    const {data} = await axios.post('auth/verify-email', obj, config);
    if(data) isVerified = true
  } catch (error) {
    isVerified = false
  }

  if(!token || !email) {
    return {
        redirect: {
          permanent: false,
          destination: '/',
        },
    }
  }
    
  return {
    props: {
      isVerified,
    },
  };
};