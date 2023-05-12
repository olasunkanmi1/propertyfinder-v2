import Images from './images';
import Info from './info';
import { UniquePropertyPageProps } from '@types'

const Details: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  return (
    <div className='flex flex-col xll:max-w-[calc(100%-390px)] min-h-auto'>
        <Images propertyDetails={propertyDetails} />
        <Info propertyDetails={propertyDetails} />
    </div> 
  )
}

Details.displayName = 'Details';
export default Details