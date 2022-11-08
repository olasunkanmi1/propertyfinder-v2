import React from 'react'
import Image from 'next/image'
import Property from '../../property'
import noResult from "../../../public/noresult.jpg";
import { FindPropertyPageProps } from '../../../types';
import { useRouter } from 'next/router';
import Heading from '../../heading';

const Properties: React.FC<FindPropertyPageProps> = ({ properties }) => {
  const router = useRouter();
  const purpose = !router.query.purpose || router.query.purpose === 'for-rent' ? 'for rent' : router.query.purpose === 'for-sale' ? 'for sale' : ''

  return (
    <div className='space-y-4'>
      { purpose && <Heading heading={`Properties available ${purpose}`} /> }

      <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center'>
          {properties.map((property) => {
              return (
              <Property key={property.externalID} property={property} />
              )
          })}

          {properties.length === 0 && (
          <div>
              <Image src={noResult} alt="no result" priority />
          </div>
          )}


      </div>
    </div>
  )
}

export default Properties