import React from 'react'
import { useRecoilValue } from 'recoil'
import { navbarState } from '../../../../../states';
import Top from './top';
import PurposeAndFrequency from './purpose-and-frequency';
import PropertyType from './property-type';
import RoomsAndBaths from './rooms-and-baths';
import PriceAndArea from './price-and-area.';
import ResetAndFind from './reset-and-find';

const Filterbar = () => {
  const filterbarOpen = useRecoilValue(navbarState);
  const { isFilterbarOpen } = filterbarOpen;

  return (
    <div className={`md:hidden fixed left-[10px] w-[calc(100%-20px)] duration-500 ease-in-out bg-gray-50 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] h-[70%] rounded-tl-[20px] rounded-tr-[20px] z-10 ${ isFilterbarOpen ? 'bottom-0' : '-bottom-[100%]' }`}>
      <div className='relative h-full'>
        <Top />

        <div className=' space-y-4 overflow-auto h-[calc(100%-128px)] p-5 pt-0'>
          <PurposeAndFrequency />
          <PropertyType />
          <RoomsAndBaths />
          <PriceAndArea />
        </div>

        <ResetAndFind />
      </div>
    </div>
  )
}

export default Filterbar