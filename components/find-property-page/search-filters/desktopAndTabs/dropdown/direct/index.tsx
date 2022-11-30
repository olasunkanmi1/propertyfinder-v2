import React, { useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, addressSuggestionsAtom, IFilterState, loadingState, searchFiltersState } from '../../../../../../states';
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
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);
  const setDropdown = useSetRecoilState(searchFiltersState);
  const resetSuggestions = useResetRecoilState(addressSuggestionsAtom);
  
  const [active, setActive] = useState(select === 'emirates' ? filterState.locationExternalIDs : select === 'furnishingStatus' ? filterState.furnishingStatus : filterState.sort);
  

  const handleChange = (value: string, name: string) => {
    setActive(value);
    if(select === 'emirates') {
      setFilterState(filterState => ({
        ...filterState,
        emirates: name
      }))
      
      resetSuggestions();
    } else if (select === 'sort') {
      setFilterState(filterState => ({
        ...filterState,
        sortBy: name
      }))
    }

    setDropdown(dropdown => ({
      ...dropdown,
      main: null
    }));

    setFilterState(filterState => ({
        ...filterState,
        [queryName as keyof IFilterState]: value
    }))


    if(queryName) findProperties({ [queryName]: value }) 
  }

  return (
    <div className='space-y-2 absolute top-[47px] left-0 w-full rounded p-2 bg-white z-20 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
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