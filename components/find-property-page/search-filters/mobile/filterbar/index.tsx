import React from 'react'
import { useRecoilState } from 'recoil'
import { filterState, navbarState } from '../../../../../states';
import Purpose from './purpose';
import PropertyType from './property-type';
import BedsAndBaths from './beds-and-baths';
import Price from './price';
import Area from './area';
import Frequency from './frequency';

const Filterbar = () => {
  const [filterbarOpen, setFilterbarOpen] = useRecoilState(navbarState);
  const [filter, setFilter] = useRecoilState(filterState);
  const { isFilterbarOpen } = filterbarOpen;
  const { purpose, frequency  } = filter;

  return (
    <div className={`fixed left-[10px] w-[calc(100%-20px)] overflow-auto duration-500 ease-in-out bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-5 h-[70%] rounded-tl-[20px] rounded-tr-[20px] z-10 ${ isFilterbarOpen ? 'bottom-0' : '-bottom-[100%]' }`}>
      <div className='relative space-y-4'>
        <Purpose purpose={purpose} />
        <Frequency frequency={frequency} />
        <PropertyType />
        <BedsAndBaths />
        <Price />
        <Area />
      </div>
    </div>
  )
}

export default Filterbar