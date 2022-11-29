import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, loadingState, searchFiltersState } from '../../../../../../states';
import { ICategoryType, IDropdownWithMinMaxProps } from '../../../../../../types';
import { useRouter } from 'next/router';
import { findProperties } from '../../..';

interface IDirectDropdownProps {
    title: string;
    options?: {
        name: string;
        value: string;
    }[];
    queryName?: string;
    select: string;
}

const DirectDropdown: React.FC<IDirectDropdownProps> = ({ title, options, queryName, select}) => {
  const router = useRouter();
  const [active, setActive] = useState(select === 'emirates' ? router.query.locationExternalIDs : select === 'furnishingStatus' ? router.query.furnishingStatus : router.query.sort);

  const setLoading = useSetRecoilState(loadingState);
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const handleChange = (value: string, name: string) => {
    setActive(value);
    if(select === 'emirates') {
      setFilterState(filterState => ({
        ...filterState,
        emirates: name
      }))
    } else if (select === 'sort') {
      setFilterState(filterState => ({
        ...filterState,
        sortBy: name
      }))
    }

    setFilterState(filterState => ({
        ...filterState,
        [queryName as keyof IFilterState]: value
    }))


    if(queryName) findProperties({ [queryName]: value }) 
  }

  useEffect(() => {
    if(select === 'emirates') {
      setActive(router.query.locationExternalIDs  ? router.query.locationExternalIDs : '')
    } else if(select === 'furnishingStatus') {
      setActive(router.query.furnishingStatus  ? router.query.furnishingStatus : 'any')
    } else {
      setActive(router.query.sort  ? router.query.sort : 'popular')
    }
  }, [router.query.locationExternalIDs, router.query.furnishingStatus , router.query.sort, select])

  return (
    <div className='space-y-2 absolute top-[50px] left-0 w-full rounded border p-2 bg-white z-20 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
      <h5 className='text-black text-sm font-semibold'> {title} </h5>

      <div className="flex flex-col space-y-2 w-full ">
        { options?.map((option) => {
           const { name, value } = option

           return (
             <div onClick={() => handleChange(value, name)} key={name}
               className={`flex items-center justify-center py-1 px-2 w-full rounded-full border text-sm cursor-pointer hover:tabSortActive ${active === value ? 'tabSortActive text-primary' : 'text-black'}`} 
              >
               {name}
             </div>
            )
        }) }
      </div>
    </div>
  )
}

export default DirectDropdown