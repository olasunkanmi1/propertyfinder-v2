import React from 'react'
import { SimilarPropertiesProps } from '../../types'
import Property from '../property'
import { useRouter } from 'next/router'

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({similarProperties}) => {
    const router = useRouter();
    const filteredProperties = similarProperties.filter((property) => property.externalID !== router.query.id)

  return (
    <div className='col-span-1 xll:col-span-3'>
        <h1 className='font-bold text-2xl mb-2 text-primary'> Similar properties </h1>

        <div className="flex gap-5 mx-auto pb-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
            {filteredProperties.map((property) => {
                return (
                  <Property key={property.externalID} property={property} />
                )
            })}
        </div>
    </div>
  )
}

export default SimilarProperties