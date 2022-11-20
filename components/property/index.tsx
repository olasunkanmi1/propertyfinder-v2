import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PropertyProps } from '../../types'
import DefaultImage from '../../public/assets/house.webp';
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { FaBath, FaBed, FaRegHeart } from 'react-icons/fa';
import { MdWindow } from 'react-icons/md';

const Property: React.FC<PropertyProps> = ({ property }) => {
    const { coverPhoto, price, rooms, title, baths, area, isVerified, rentFrequency, agency, externalID } = property

    return (
        <Link href={`/property/${externalID}`} passHref>
            <a className="w-full ls:w-[300px] z-0">
                <div className="relative rounded-xl w-full h-[160px] overflow-hidden">
                    <Image 
                        src={coverPhoto ? coverPhoto.url : DefaultImage} alt="cover-photo" layout="fill" priority
                        blurDataURL={coverPhoto && coverPhoto.url} 
                    />

                    <div className="flex justify-center items-center absolute top-2 right-2 text-white z-20 hover:bg-gray-400 transition ease-in-out w-[30px] h-[30px] rounded-md">
                        <FaRegHeart size={20} onClick={() =>  alert('done')} />
                    </div>
                </div>

                <div className="flex flex-col p-2 gap-[5px]">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2 items-center">
                            { isVerified && <div className='text-green-500 '> <GoVerified size={20} /> </div> }
                            <p className="font-bold font-lg leading-tight"> AED {millify(price)} {rentFrequency && `/ ${rentFrequency}`} </p>
                        </div>
                        
                        <div className="flex space-x-2 justify-center items-center w-[25px] h-[25px] relative rounded-full overflow-hidden border bg-secondary text-white">
                            <Image 
                                src={agency.logo ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'} alt="Agency Logo" layout="fill" priority 
                                blurDataURL={agency.logo ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center font-normal">
                        <p className='propertyBBA'> <FaBed />{rooms} </p>
                        <p className='propertyBBA'> <FaBath />{baths} </p>
                        <p className='propertyBBA'> <MdWindow />{millify(area)} sqft  </p>
                    </div>

                    <p className='truncate font-medium'> {title} </p>
                    { agency && <p className='truncate font-normal text-sm text-secondary'> {agency.name} </p>}
                </div>
            </a>
        </Link>
  )
}

export default Property