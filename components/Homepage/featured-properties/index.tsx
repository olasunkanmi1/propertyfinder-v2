import { useRecoilValue } from 'recoil';
import { propertiesState } from '@states';
import {CardSkeleton, Property, Heading} from '@components';

const FeaturedProperties = () => {
  const properties = useRecoilValue(propertiesState)
  
  return (
    <div className="space-y-4">
      <Heading heading='Popular Properties' forProperty />

      <div className={`grid grid-cols-1 gap-y-6 gap-x-4 ${properties.isList ? 'listLayout md:grid-cols-2' : 'gridLayout sm:grid-cols-3 lg:grid-cols-4'}`}>
        { properties.featuredProperties?.length === 0 ? (
          [...Array(4)].map((_, index) => <CardSkeleton key={index} />)
        ) : (
          properties.featuredProperties?.map((property) => {
              return (
                <Property property={property} key={property.externalID} />
              )
          })
        )}
      </div>
    </div>
  )
}

export default FeaturedProperties