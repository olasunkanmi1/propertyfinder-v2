import React, { useState, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, loadingState } from '../../../../../../states';
import { IDropdownWithToggleProps } from '../../../../../../types';
import { filterData } from '../../../../../../utils/filterData';
import { findProperties } from '../../..';
import Options from './options';
import { useRouter } from 'next/router';
import { filter } from '@chakra-ui/react';

const DropdownWithToggle: React.FC<IDropdownWithToggleProps> = ({ select, title, tabs, queryName, categories }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const [toggle, setToggle] = useState<{purpose: string | string[]; propertyType: string | string[]}>({
    purpose: '',
    propertyType: ''
  });
  const rentFrequency = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');
  const residentialProperty = categories?.filter((filter, index) => index === 0);
  const commercialProperty = categories?.filter((filter, index) => index === 1);
  const residentialPropertyList = ['1', '4', '16', '3', '18', '21', '19', '14', '12', '17'];
  const commercialPropertyList = ['2', '5', '6', '7', '9', '25', '20', '15', '13', '10', '8', '22', '23', '24', '11'];
  
  const changeTab = (value: string) => {
    if(select === 'purpose') {
      setToggle( toggle => ({
        ...toggle,
        purpose: value,
      }));

      setFilterState(filterState => ({
        ...filterState,
        purpose: value
      }))

      // setLoading(loading => ({
      //   ...loading,
      //   propertiesLoading: true
      // }))
    } else {
      setToggle( toggle => ({
        ...toggle,
        propertyType: value,
      }));
    }
    
    

    if(queryName) findProperties({ [queryName]: value }) 
  }

  useEffect(() => {
    setToggle({
      purpose: router.query.purpose ? router.query.purpose : 'for-rent',
      propertyType: router.query.categoryExternalID  ? router.query.categoryExternalID : '1'
    });
  }, [ router.query.purpose, router.query.categoryExternalID ])

  return (
    <div className={`space-y-2 absolute top-[50px]  rounded border p-2 bg-white overflow-auto z-20 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] ${select === 'property-type' ? 'right-0 w-[370px]' : 'left-0 w-full'}`}>
      <h5 className='text-black text-sm font-semibold'> {title} </h5>

      <div className="flex border p-1 rounded">
        { select === 'purpose' ? (
          tabs?.map((item) => (
              <div onClick={() => changeTab(item.value)} key={item.name} className={`filterTab ${toggle.purpose === item.value ? 'filterTabActive' : ''}`}>
                  { item.name }
              </div>
          ))
        ) : (
          <>
            <div onClick={() => changeTab(categories![0].value!)} className={`filterTab ${residentialPropertyList.includes(toggle.propertyType.toString()) ? 'filterTabActive' : ''}`}>
               { categories![0].placeholder }
            </div>
            <div onClick={() => changeTab(categories![1].value!)} className={`filterTab ${commercialPropertyList.includes(toggle.propertyType.toString()) ? 'filterTabActive' : ''}`}>
               { categories![1].placeholder }
            </div>
           </>
        )}
      </div>

      <Options 
        options={ 
          select === 'purpose' && toggle.purpose === 'for-sale' ? [] : 
          select === 'purpose' && toggle.purpose === 'for-rent' ? rentFrequency : 
          select === 'property-type' && residentialPropertyList.includes(toggle.propertyType.toString()) ? residentialProperty : 
          select === 'property-type' && commercialPropertyList.includes(toggle.propertyType.toString()) ? commercialProperty : 
          []
        } 
        select={select}
      /> 
    </div>
  )
}

export default DropdownWithToggle