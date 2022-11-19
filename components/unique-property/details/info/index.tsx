import React from 'react'
import { GoVerified } from 'react-icons/go';
import { MdWindow } from 'react-icons/md';
import { FaBath, FaBed, FaRegHeart } from 'react-icons/fa'
import millify from 'millify';
import { UniquePropertyPageProps } from '../../../../types';
import PropertyInfos from './property-info';
import Amenities from './amenities';
import ReactPlayer from 'react-player'

const Info: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { isVerified, price, rentFrequency, rooms, baths, area, title, description, coverVideo } = propertyDetails;

  return (
    <div className='space-y-5'>
        <div className="flex flex-col pt-3 gap-[5px] space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                    { isVerified && <div className='text-green-500 '> <GoVerified size={30} /> </div> }
                    <p className="font-bold font-lg leading-tight text-lg capitalize"> AED <span className='text-3xl'>{price.toLocaleString()}</span> {rentFrequency && `${rentFrequency}`} </p>
                </div>
                
                <div className="flex space-x-2 justify-center items-center py-2 px-4 cursor-pointer rounded-md bg-primary bg-opacity-20 border border-primary text-primary font-medium">
                    <FaRegHeart size={20} /> <span> Save </span>
                </div>
            </div>

            <p className='font-bold'> {title} </p>

            <div className="flex justify-between items-center font-normal text-lg">
                <p className='propertyBBA'> <FaBed /> {rooms} </p>
                <p className='propertyBBA'> <FaBath /> {baths} </p>
                <p className='propertyBBA'> <MdWindow /> {millify(area)} sqft  </p>
            </div>

            <div>
                <h1 className='font-bold text-xl mb-2 text-primary'> Property Description </h1>
                <p dangerouslySetInnerHTML={{__html: description}} className='font-medium' />
            </div>
        </div>

        {coverVideo && (
            <ReactPlayer url={coverVideo.url} width='320px' height='320' controls /> 
        )}

        <PropertyInfos propertyDetails={propertyDetails} />
        <Amenities propertyDetails={propertyDetails} />
    </div>
  )
}

export default Info