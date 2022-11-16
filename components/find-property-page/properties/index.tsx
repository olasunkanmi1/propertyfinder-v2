import React from 'react'
import Image from 'next/image'
import Property from '../../property'
import homeNotFound from "../../../public/assets/homeNotFound.webp";
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
            <div className='pb-4'>
              <div className="relative w-full h-[300px] md:w-[400px] md:h-[400px]">
                <Image src={homeNotFound} alt="no result" priority layout='fill' />
              </div>

              <h1 className='font-bold text-2xl text-center'> No property found. Try other options </h1>
            </div>
          )}


      </div>
    </div>
  )
}

export default Properties