import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, loadingState } from '../../../../../../states';
import { IDropdownWithToggleProps } from '../../../../../../types';
import { filterData } from '../../../../../../utils/filterData';
import { findProperties } from '../../../mobile';
import Options from './options';
import { useRouter } from 'next/router';

const DropdownWithToggle: React.FC<IDropdownWithToggleProps> = ({ state, title, tabs, queryName, categories }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const [toggle, setToggle] = useState(categories ? 'Residential' : filterState[state as keyof IFilterState]);
  const rentFrequency = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');

  const changeTab = (value: string) => {
    setToggle(value);
    if(tabs) {
      setLoading(loading => ({
        ...loading,
        propertiesLoading: true
      }))
    }
    setFilterState(loading => ({
      ...loading,
      purpose: value
    }))

    if(queryName) findProperties({ [queryName]: value }) 
  }

  return (
    <div className={`space-y-2 absolute top-[50px]  rounded border p-2 bg-white w-full overflow-auto z-20 ${categories ? 'right-0 w-[300px]' : 'left-0 w-full'}`}>
      <h5 className='text-black font-semibold'> {title} </h5>

      <div className="flex border p-1 rounded">
        { tabs ? (
          tabs.map((item) => (
              <div onClick={() => changeTab(item.value)} key={item.name} className={`filterTab ${toggle === item.value ? 'filterTabActive' : ''}`}>
                  { item.name }
              </div>
          ))
        ) : (
          categories?.map((category) => (
            <div onClick={() => changeTab(category.placeholder)} key={category.placeholder} className={`filterTab ${toggle === category.placeholder ? 'filterTabActive' : ''}`}>
                { category.placeholder }
            </div>
          )) 
        )}
      </div>

      <Options options={ toggle === 'for-sale' ? [] : rentFrequency } /> 
    </div>
  )
}

export default DropdownWithToggle