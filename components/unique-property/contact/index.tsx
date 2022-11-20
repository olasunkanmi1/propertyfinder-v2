import Image from 'next/image';
import React from 'react'
import { AiFillFlag } from 'react-icons/ai';
import { UniquePropertyPageProps } from '../../../types'
import Disclaimer from './disclaimer';
import GetInTouch from './get-in-touch';

const Contact: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { agency, permitNumber } = propertyDetails;

  return (
    <div className='col-span-1 xll:h-[calc(100vh-135px)] min-h-[]'>
        <div className='border-b pb-3'>
            <h1 className='font-semibold mb-2 text-primary'>AGENCY:</h1>

            <div className='space-y-1'>
                <div className='flex flex-wrap gap-3 justify-between items-center'>
                    <p className='font-semibold leading-[18px]'> {agency.name} </p>
                
                    <div className="flex justify-center items-center w-[100px] text-white">
                        <img
                            src={agency.logo ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'} alt="Agency Logo" 
                        />
                    </div> 
                </div>
                
                <p className='font-medium text-center'> Permit no.: {permitNumber} </p>
            </div>
        </div>

        <GetInTouch propertyDetails={propertyDetails} />
        <Disclaimer agency={agency.name}/>

        <button className='flex items-center gap-2 rounded py-2 px-4 bg-primary text-white mx-auto'> <AiFillFlag size={20} /> Report this property  </button>
    </div>
  )
}

export default Contact