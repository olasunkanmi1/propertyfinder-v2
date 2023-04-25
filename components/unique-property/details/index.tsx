import {memo} from 'react'
import dynamic from 'next/dynamic'
import { UniquePropertyPageProps } from '../../../types'
const Images = dynamic(() => import('./images'));
const Info = dynamic(() => import('./info'));

const Details: React.FC<UniquePropertyPageProps> = memo(({propertyDetails}) => {
  return (
    <div className='inline-grid col-span-1 xll:col-span-2 xll:pr-3 xll:h-[calc(100vh-135px)] min-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
        <Images propertyDetails={propertyDetails} />
        <Info propertyDetails={propertyDetails} />
    </div> 
  )
})

Details.displayName = 'Details';
export default Details