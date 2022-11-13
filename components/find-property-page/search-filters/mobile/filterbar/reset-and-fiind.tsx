import React from 'react'
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { filterAtom, navbarState } from '../../../../../states'

const ResetAndFind = () => {
  const router = useRouter();

  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const resetFilter = useResetRecoilState(filterAtom);
  const closeFilter = useSetRecoilState(navbarState);
  const { purpose, frequency, categoryExternalID, roomsMin, roomsMax, bathsMin, bathsMax, minPrice, maxPrice, areaMin, areaMax  } = filterState;

  const handlePageClick = () => {
    closeFilter(filter => ({
      ...filter, 
      isFilterbarOpen: false
    }));

    router.push({ 
      pathname: router.pathname, 
      query: { 
        ...router.query, 
        page: '1',
        purpose,
        rentFrequency: frequency,
        categoryExternaLID: categoryExternalID ? categoryExternalID : '',
        roomsMin: roomsMin,
        roomsMax: roomsMax === 'any' ? '' : roomsMax,
        bathsMin: bathsMin,
        bathsMax: bathsMax === 'any' ? '' : bathsMax,
        priceMin: minPrice,
        priceMax: maxPrice === 'any' ? '' : maxPrice,
        areaMin: areaMin,
        areaMax: areaMax === 'any' ? '' : areaMax,
      } 
    }); 
  }

  return (
    <div className='flex justify-between p-2 absolute bottom-0 w-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-white '>
        <button onClick={resetFilter} className='border border-primary rounded py-2 px-4 font-bold text-primary'>
            Reset
        </button>
        
        <button onClick={handlePageClick} className='rounded bg-primary py-2 px-4 text-bold text-white w-[calc(100%-90px)]'>
            Find
        </button>
    </div>
  )
}

export default ResetAndFind