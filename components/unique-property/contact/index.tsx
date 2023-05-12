/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { AiFillFlag } from 'react-icons/ai';
import Disclaimer from './disclaimer';
import GetInTouch from './get-in-touch';
import { UniquePropertyPageProps } from '@types'

const Contact: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { agency, permitNumber, phoneNumber } = propertyDetails;

  return (
    <div>
        <div className='border-b pb-3'>
            <h1 className='font-semibold mb-2 text-primary text-xl'>AGENCY:</h1>

            <div className='space-y-1'>
                <div className='flex flex-col items-center space-y-1'>
                    <div className="flex justify-center items-center w-[100px] text-white">
                        <img
                            src={agency.logo ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'} alt="Agency Logo" 
                        />
                    </div> 

                    <p className='font-semibold leading-[18px]'> {agency.name} </p>
                </div>
                
                { permitNumber && <p className='font-medium text-center'> Permit no.: {permitNumber} </p> }
            </div>
        </div>

        <GetInTouch propertyDetails={propertyDetails} />
        <Disclaimer agency={agency.name}/>

        <Link href={`tel:${phoneNumber.mobile}`} passHref > 
            <a className='flex items-center gap-2 rounded py-2 px-4 bg-red-500 text-white mx-auto w-fit btnAnimation'>
                <AiFillFlag size={20} /> Report this property  
            </a>
        </Link>
    </div>
  )
}

export default Contact