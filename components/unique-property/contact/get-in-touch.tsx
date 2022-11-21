import React from 'react'
import Link from 'next/link';
import { UniquePropertyPageProps } from '../../../types'
import { BsTelephoneOutbound } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

const GetInTouch: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  const { phoneNumber, referenceNumber } = propertyDetails;

  return (
    <div className='py-3 border-b space-y-2'>
      <h1 className='text-center font-medium text-primary'> Get in touch with us for more information. </h1>

      <div className='flex justify-between'>
        <Link href={`tel:${phoneNumber.mobile}`} passHref>
          <a className='contact_links'> <BsTelephoneOutbound size={20} /> CALL </a>
        </Link>
        
        <Link href={`https://wa.me/${phoneNumber.whatsapp}?text=I%20would%20like%20to%20inquire%20about%20your%20property%20Bayut%20-%20${referenceNumber}.`} passHref>
          <a className='contact_links'> <FaWhatsapp size={20} /> WHATSAPP </a>
        </Link>
      </div>
    </div>
  )
}

export default GetInTouch