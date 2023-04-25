import Image from 'next/image';
import Link from 'next/link';
import { AiFillFlag } from 'react-icons/ai';
import { UniquePropertyPageProps } from '../../../types'
import Disclaimer from './disclaimer';
import GetInTouch from './get-in-touch';

const Contact: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { agency, permitNumber, phoneNumber } = propertyDetails;

  return (
    <div className='col-span-1 xll:h-[calc(100vh-135px)] min-h-[]'>
        <div className='border-b pb-3'>
            <h1 className='font-semibold mb-2 text-primary'>AGENCY:</h1>

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
            <a className='flex items-center gap-2 rounded py-2 px-4 bg-primary text-white mx-auto w-fit'>
                <AiFillFlag size={20} /> Report this property  
            </a>
        </Link>
    </div>
  )
}

export default Contact