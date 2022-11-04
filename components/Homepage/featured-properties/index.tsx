import React from 'react';
import { HomepageProps } from '../../../types';
import Property from '../../property';

const FeaturedProperties: React.FC<HomepageProps> = ({ featuredProperties }) => {
  console.log(featuredProperties)
  const fp = featuredProperties?.filter((fp) => fp.product === 'superhot')

  return (
    <div className="space-y-4">
      <h1 className="mx-auto text-2xl ms:text-4xl text-primary font-semibold items-center w-max"> Featured Properties </h1>

      <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center'>
          {
            fp?.map((property) => {
              return (
                <Property property={property} key={property.externalID} />
              )
            })
          }
      </div>
    </div>
  )
}

export default FeaturedProperties