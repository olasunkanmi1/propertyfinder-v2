import {useState, useEffect} from 'react'
import { filterData } from '../../../../../../utils/filterData';
import { useRouter } from 'next/router';
import Frequency from './frequency';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, loadingState } from '../../../../../../states';
import { findProperties } from '../../../../../../utils/findProperties';

const PurposeAndFrequency = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');

  const changeTab = (value: string, queryName: string) => {
    setFilterState(filterState => ({
      ...filterState,
      purpose: value
    }))
    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

    findProperties({ [queryName]: value }, setLoading)
  }

  return (
    <div className='space-y-4'>
      <div className="flex border p-1 rounded">
          { purposes.map((purpose) => {
              const { items, placeholder, queryName } = purpose;

              return (
                  <div key={placeholder} className='flex w-full'>
                      { items?.map((item) => (
                          <div onClick={() => changeTab(item.value, queryName)} key={item.name} className={`tabSort ${filterState.purpose === item.value ? 'tabSortActive' : ''}`}>
                              { item.name }
                          </div>
                      )) }
                  </div>
              )

          }) }
      </div>

      { filterState.purpose === 'for-rent' && <Frequency /> }
    </div>  
  )
}

export default PurposeAndFrequency