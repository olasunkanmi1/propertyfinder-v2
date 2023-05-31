import Images from './images';
import Info from './info';
import { UniquePropertyPageProps } from '@types'

const Details: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  return (
    <div className='flex flex-col lg:max-w-[calc(100%-390px)] min-h-auto wrapper lg:p-0 lg:m-0'>
        <Images propertyDetails={propertyDetails} />
        <Info propertyDetails={propertyDetails} />
    </div> 
  )
}

Details.displayName = 'Details';
export default Details