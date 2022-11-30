import React from 'react'
import { filterData } from '../../../../../../utils/filterData';
import { findProperties } from '../../..';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, loadingState } from '../../../../../../states';

const Frequency  = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const frequencies = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');

  const changeTab = (value: string, queryName: string) => {
    setFilterState(filterState => ({
      ...filterState,
      rentFrequency: value
    }))
    // setLoading(loading => ({
    //      ...loading,
    //      propertiesLoading: true
    //  }))

    findProperties({ [queryName]: value })
  }

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Rental Frequency </h5>

      <div className='flex overflow-auto w-full gap-2 pb-4'>
        { frequencies.map((frequency) => {
            const { items, placeholder, queryName } = frequency;

            return (
              <div key={placeholder} className='flex gap-2'>
                  { items?.map((item) => (
                      <div onClick={() => changeTab(item.value, queryName)} key={item.name} className={`frequencySort ${filterState.rentFrequency === item.value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}>
                          { item.name }
                      </div>
                  )) }
              </div>
            )

        }) }
      </div>
    </div>
  )
}

export default Frequency