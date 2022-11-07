import React from 'react'
import Image from 'next/image'
import Property from '../../property'
import noResult from "../../../public/noresult.jpg";
import { FindPropertyPageProps } from '../../../types';

const Properties: React.FC<FindPropertyPageProps> = ({ properties }) => {
  return (
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
  )
}

export default Properties