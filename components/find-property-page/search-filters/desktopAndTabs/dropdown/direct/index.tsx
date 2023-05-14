import { useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, addressSuggestionsAtom, loadingState, searchFiltersState } from '@states';
import { findProperties } from '@utils';
import { IDirectDropdownProps, IFilterState } from '@types';

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
        locationExternalIDs: value,
        emirates: value === 'any' ? 'any' : name,
        address: ''
      }))
      
      resetSuggestions();
    } else if (select === 'sortBy') {
      setFilterState(filterState => ({
        ...filterState,
        sort: value,
        sortBy: value === 'any' ? 'any' : name
      }))
    } else {
      setFilterState(filterState => ({
        ...filterState,
        furnishingStatus: value
      }))
    }

    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

    setDropdown(dropdown => ({
      ...dropdown,
      main: null
    }));

    setFilterState(filterState => ({
        ...filterState,
        [queryName as keyof IFilterState]: value
    }))


    findProperties({ [queryName]: value }, setLoading) 
  }

  return (
    <div className='dropdownWrapper top-[48px] left-0 w-full'>
      <h5 className='dropdownWrapperHeader'> {title} </h5>

      <div className="flex flex-col space-y-2 w-full">
        { options?.map(({name, value}) => (
          <div onClick={() => handleChange(value, name)} key={name}
            className={`flex items-center justify-center py-1 px-2 w-full rounded-full border text-sm cursor-pointer hover:tabSortActive ${active === value ? 'tabSortActive text-primary' : 'text-black'}`} 
          >
            {name}
          </div>
        )) }
      </div>
    </div>
  )
}

export default DirectDropdown