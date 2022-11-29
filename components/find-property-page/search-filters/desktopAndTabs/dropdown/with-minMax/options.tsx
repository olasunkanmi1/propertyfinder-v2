import React from 'react'
import { useRouter } from 'next/router';
import { findProperties } from '../../..';
import { filterAtom, IFilterState, searchFiltersState } from '../../../../../../states';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface IOptionsProps {
  items: {
    name: string;
    value: string;
}[];
  queryName: string;
}

const Options: React.FC<IOptionsProps> = ({items, queryName}) => {
    const router = useRouter();
    const setDropdown = useSetRecoilState(searchFiltersState);
    const [filterState, setFilterState] = useRecoilState(filterAtom);

    const handleChange = (value: string) => {
        setDropdown( dropdown => ({
            ...dropdown,
            minMax: null
        }));
        
        setFilterState(filterState => ({
          ...filterState,
          [queryName]: value,
        }))
    
        // setLoading(loading => ({
        //   ...loading,
        //   propertiesLoading: true
        // }))
    
         findProperties({ [queryName]: value })
      }
    
  return (
    <div className='absolute top-[37px] left-0 w-full border rounded overflow-auto z-[100] bg-white max-h-[150px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100"'>
      { items.map((item) => {
        const { name, value  } = item;
        const selected = router.query[queryName] ? router.query[queryName] === item.value : filterState[queryName as keyof IFilterState] === item.value

        return (
            <div key={name} onClick={() => handleChange(value)} className={`flex items-center justify-center w-full hover:bg-primary hover:text-white ${selected ? 'bg-primary text-white' : ''}`}> {name} </div>
        )
        }) }
    </div>
  )
}

export default Options