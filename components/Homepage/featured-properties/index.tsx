import { HomepageProps } from '../../../types';
import Heading from '../../heading';
import Property from '../../property';

const FeaturedProperties: React.FC<HomepageProps> = ({featuredProperties}) => {
  return (
    <div className="space-y-4">
      <Heading heading='Featured Properties' />

      <div className='flex flex-wrap justify-center gap-x-5 gap-y-10 w-full py-5'>
          {featuredProperties?.map((property) => {
              return (
                <Property property={property} key={property.externalID} />
              )
          })}
      </div>
    </div>
  )
}

export default FeaturedProperties