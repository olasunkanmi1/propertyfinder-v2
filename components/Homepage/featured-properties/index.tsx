import React from 'react';
import { useRecoilValue } from 'recoil';
import { propertiesState } from '../../../states';
import Heading from '../../heading';
import Property from '../../property';
import CardSkeleton from '../../property/skeleton';

const FeaturedProperties: React.FC<{loading: boolean}> = ({loading}) => {
  const properties = useRecoilValue(propertiesState)

  return (
    <div className="space-y-4">
      <Heading heading='Featured Properties' />

      <div className='flex flex-wrap justify-center gap-x-5 gap-y-10 w-full py-5'>
        { loading ? (
          [...Array(3)].map((arr, index) => <CardSkeleton key={index} />)
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