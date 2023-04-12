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

      <div className='gridLayout'>
        { loading ? (
          [...Array(4)].map((arr, index) => <CardSkeleton key={index} />)
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