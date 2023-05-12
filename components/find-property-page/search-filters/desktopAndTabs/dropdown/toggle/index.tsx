import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Options from './options';
import { filterAtom, loadingState } from '@states';
import { IDropdownWithToggleProps, IFilterState } from '@types';
import { findProperties, selections, propertyTypeSelections, propertyTypeSelectionsIDs } from '@utils';

const ToggleDropdown: React.FC<IDropdownWithToggleProps> = ({ select, title, items, queryName, categories }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const {residentialProperty, commercialProperty} = propertyTypeSelections;
  const {residentialPropertyIDs} = propertyTypeSelectionsIDs;
  const rentFrequency = selections.rentFrequency;
  const [tab, setTab] = useState(residentialPropertyIDs.includes(filterState.categoryExternalID.toString()) ? '1' : '2')
  
  const changeTab = (value: string) => {
    if(select === 'purpose') {
      setFilterState(filterState => ({
        ...filterState,
        purpose: value.toString()
      }))

      setLoading(loading => ({
        ...loading,
        propertiesLoading: true
      }))

      findProperties({ [queryName]: value }, setLoading) 
    } else {
      setTab(value)
    }    
  }

  const options = select === 'purpose' && filterState.purpose === 'for-sale' ? [] : 
    select === 'purpose' && filterState.purpose === 'for-rent' ? rentFrequency.items : 
    select === 'propertyType' && tab === '1' ? residentialProperty.items : 
    select === 'propertyType' && tab == '2' ? commercialProperty.items : 
    []

  return (
    <div className={`dropdownWrapper top-[48px] overflow-auto ${select === 'propertyType' ? 'right-0 w-[370px]' : 'left-0 w-full'}`}>
      <h5 className='dropdownWrapperHeader'> {title} </h5>

      <div className="flex border p-1 rounded">
        { items ? (
            items.map(({name, value}) => (
                <div onClick={() => changeTab(value)} key={name} className={`filterTab ${filterState[queryName as keyof IFilterState] === value ? 'filterTabActive' : ''}`}>
                    { name }
                </div>
            ))
        ) : (
          categories?.map(({items, placeholder}, i) => {
              const tabValue = (i + 1).toString();

              return (
                <div key={placeholder} onClick={() => changeTab(tabValue)} className={`filterTab ${tabValue === tab ? 'filterTabActive' : ''}`}>
                  { placeholder }
                </div>
              )
          })
        )}
      </div>

      <Options options={options} queryName={ select === 'purpose' ? rentFrequency.queryName : queryName} select={select} /> 
    </div>
  )
}

export default ToggleDropdown