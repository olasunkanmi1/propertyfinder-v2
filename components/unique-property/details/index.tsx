import {memo} from 'react'
import dynamic from 'next/dynamic'
import { UniquePropertyPageProps } from '../../../types'
const Images = dynamic(() => import('./images'));
const Info = dynamic(() => import('./info'));

const Details: React.FC<UniquePropertyPageProps> = memo(({propertyDetails}) => {
  return (
    <div className='flex flex-col col-span-1 xll:col-span-2 xll:pr-3 min-h-auto'>
        <Images propertyDetails={propertyDetails} />
        <Info propertyDetails={propertyDetails} />
    </div> 
  )
})

Details.displayName = 'Details';
export default Details