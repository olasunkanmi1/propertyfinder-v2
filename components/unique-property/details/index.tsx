import React from 'react'
import { UniquePropertyPageProps } from '../../../types'
import Images from './images';
import Info from './info';

const Details: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { coverPhoto, isVerified, price, rentFrequency, agency, rooms, baths, area, title, photos  } = propertyDetails;

  return (
    <div className='inline-grid col-span-1 xll:col-span-2 xll:pr-3 xll:h-[calc(100vh-135px)] min-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
        <Images propertyDetails={propertyDetails} />
        <Info propertyDetails={propertyDetails} />
    </div> 
  )
}

export default Details