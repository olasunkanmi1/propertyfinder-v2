import React from 'react'
import { FilterState } from '../../../../../states'
import { filterData } from '../../../../../utils/filterData';

const Frequency: React.FC<FilterState> = ({frequency: active}) => {
  const frequencies = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Rental Frequency </h5>

      <div className='flex overflow-auto w-full gap-2 pb-4'>
        <div className={`frequencySort ${active === 'any' && 'bg-primary bg-opacity-20 border border-primary text-primary'}`}>
            Any
        </div>

        { frequencies.map((frequency) => {
            const { items, placeholder } = frequency;

            return (
              <div key={placeholder} className='flex gap-2'>
                  { items?.map((item) => (
                      <div key={item.name} className={`frequencySort ${active === item.value && 'bg-primary bg-opacity-20 border border-primary text-primary'}`}>
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