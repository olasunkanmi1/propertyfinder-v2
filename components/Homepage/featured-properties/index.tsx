import { useRecoilValue } from 'recoil';
import { propertiesState } from '../../../states';
import Heading from '../../heading';
import {Property} from '../../index';
import CardSkeleton from '../../property/skeleton';

const FeaturedProperties = () => {
  const properties = useRecoilValue(propertiesState)

  return (
    <div className="space-y-4">
      <Heading heading='Popular Properties' />

      <div className='gridLayout'>
        { properties.featuredProperties?.length === 0 ? (
          [...Array(4)].map((_, index) => <CardSkeleton key={index} />)
        ) : (
          properties.featuredProperties?.map((property) => {
              return (
                <Property property={property} key={property.externalID} featured />
              )
          })
        )}
      </div>
    </div>
  )
}

export default FeaturedProperties