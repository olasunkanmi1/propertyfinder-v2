import React from 'react'
import { UniquePropertyPageProps } from '../../../types'
import Images from './images';
import Info from './info';

const Details: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { coverPhoto, isVerified, price, rentFrequency, agency, rooms, baths, area, title, photos  } = propertyDetails;

  return (
    <div className='hidden xl:inline-grid md:col-span-2 pr-5 mb-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
        <Images propertyDetails={propertyDetails} />
        <Info propertyDetails={propertyDetails} />
    </div> 
  )
}

export default Details