import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, loadingState } from '../../../../../../states';
import { IDropdownWithToggleProps } from '../../../../../../types';
import { filterData } from '../../../../../../utils/filterData';
import { findProperties } from '../../..';
import Options from './options';

const DropdownWithToggle: React.FC<IDropdownWithToggleProps> = ({ select, title, tabs, queryName, categories }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const rentFrequency = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');
  const residentialProperty = categories?.filter((filter, index) => index === 0);
  const commercialProperty = categories?.filter((filter, index) => index === 1);

  const residentialPropertyList = ['1', '4', '16', '3', '18', '21', '19', '14', '12', '17'];
  const commercialPropertyList = ['2', '5', '6', '7', '9', '25', '20', '15', '13', '10', '8', '22', '23', '24', '11'];
  
  const changeTab = (value: string) => {
    if(select === 'purpose') {
      setFilterState(filterState => ({
        ...filterState,
        purpose: value
      }))

      // setLoading(loading => ({
      //   ...loading,
      //   propertiesLoading: true
      // }))
    } else {
      setFilterState(filterState => ({
        ...filterState,
        categoryExternalID: value
      }))
    }
    
    

    if(queryName) findProperties({ [queryName]: value }) 
  }

  return (
    <div className={`space-y-2 absolute top-[50px]  rounded border p-2 bg-white overflow-auto z-20 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] ${select === 'property-type' ? 'right-0 w-[370px]' : 'left-0 w-full'}`}>
      <h5 className='text-black text-sm font-semibold'> {title} </h5>

      <div className="flex border p-1 rounded">
        { select === 'purpose' ? (
          tabs?.map((item) => (
              <div onClick={() => changeTab(item.value)} key={item.name} className={`filterTab ${filterState.purpose === item.value ? 'filterTabActive' : ''}`}>
                  { item.name }
              </div>
          ))
        ) : (
          <>
            <div onClick={() => changeTab('1')} className={`filterTab ${residentialPropertyList.includes(filterState.purpose ? filterState.purpose.toString(): '') ? 'filterTabActive' : ''}`}>
               { categories![0].placeholder }
            </div>
            <div onClick={() => changeTab('2')} className={`filterTab ${commercialPropertyList.includes(filterState.purpose ? filterState.purpose.toString(): '') ? 'filterTabActive' : ''}`}>
               { categories![1].placeholder }
            </div>
           </>
        )}
      </div>

      <Options 
        options={ 
          select === 'purpose' && filterState.purpose === 'for-sale' ? [] : 
          select === 'purpose' && filterState.purpose === 'for-rent' ? rentFrequency : 
          select === 'property-type' && residentialPropertyList.includes(filterState.purpose ? filterState.purpose.toString(): '') ? residentialProperty : 
          select === 'property-type' && commercialPropertyList.includes(filterState.purpose ? filterState.purpose.toString(): '') ? commercialProperty : 
          []
        } 
        select={select}
      /> 
    </div>
  )
}

export default DropdownWithToggle