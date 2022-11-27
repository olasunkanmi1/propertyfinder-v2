import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, loadingState, searchFiltersState } from '../../../../../../states';
import { ICategoryType, IDropdownWithMinMaxProps } from '../../../../../../types';
import { useRouter } from 'next/router';

interface IDirectDropdownProps {
    title: string;
    options?: {
        name: string;
        value: string;
    }[];
    queryName?: string;
}

const DirectDropdown: React.FC<IDirectDropdownProps> = ({ title, options, queryName}) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);

  return (
    <div className='space-y-2 absolute top-[50px] left-0 w-full rounded border p-2 bg-white z-20'>
      <h5 className='text-black font-semibold'> {title} </h5>

      <div className="flex flex-col space-y-2 w-full max-h-[200px] overflow-auto  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
        { options?.map((option) => {
           const { name, value } = option

           return (
             <div className="flex items-center justify-center py-1 px-2 w-full rounded-full border text-sm text-black cursor-pointer" key={name}>
               {name}
             </div>
            )
        }) }
      </div>
    </div>
  )
}

export default DirectDropdown