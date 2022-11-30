import React from 'react'
import Image from 'next/image'
import Property from '../../property'
import homeNotFound from "../../../public/assets/homeNotFound.webp";
import { FindPropertyPageProps } from '../../../types';
import { useRouter } from 'next/router';
import Heading from '../../heading';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../../states';
import CardSkeleton from '../../property/skeleton';

const Properties: React.FC<FindPropertyPageProps> = ({ properties }) => {
  const loading = useRecoilValue(loadingState);
  const router = useRouter();
  const purpose = !router.query.purpose || router.query.purpose === 'for-rent' ? 'for rent' : router.query.purpose === 'for-sale' ? 'for sale' : ''

  return (
    <div className='space-y-4'>
      <Heading heading={`${loading.propertiesLoading ? 'Loading properties' : properties.length === 0 ? 'No property found. Try other options' : `Properties available ${purpose}`}`} /> 

      <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center'>
        { loading.propertiesLoading ? (
          [...Array(6)].map((arr, index) => <CardSkeleton key={index} />)
        ) : (
          <>
            {properties.map((property) => {
                return (
                  <Property key={property.externalID} property={property} />
                )
            })}

            {properties.length === 0 && (
              <div className='mb-4 relative w-full h-[300px] md:w-[400px] md:h-[400px]'>
                <Image src={homeNotFound} alt="no result" priority layout='fill' />
              </div>
            )} 
          </>
        )}
      </div>

    </div>
  )
}

export default Properties