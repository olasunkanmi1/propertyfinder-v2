import React from 'react'
import { filterAtom } from '../../../../../states'
import { filterData } from '../../../../../utils/filterData';
import { useRecoilState } from 'recoil'

const Frequency  = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const { frequency: active } = filterState;

  const frequencies = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');

  const changeTab = (value: string) => {
    setFilterState(filterState => ({
        ...filterState,
        frequency: value,
      }))
  }

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Rental Frequency </h5>

      <div className='flex overflow-auto w-full gap-2 pb-4'>
        { frequencies.map((frequency) => {
            const { items, placeholder } = frequency;

            return (
              <div key={placeholder} className='flex gap-2'>
                  { items?.map((item) => (
                      <div onClick={() => changeTab(item.value)} key={item.name} className={`frequencySort ${active === item.value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}>
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