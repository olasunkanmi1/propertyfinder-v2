import React from 'react'
import { FilterState } from '../../../../../states';
import { filterData } from '../../../../../utils/filterData';

const Purpose: React.FC<FilterState> = ({ purpose: active }) => {
  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');

  return (
    <div className="flex border p-1 rounded">
        { purposes.map((purpose) => {
            const { items, placeholder } = purpose;

            return (
                <div key={placeholder} className='flex w-full'>
                    { items?.map((item) => (
                        <div key={item.name} className={`tabSort ${active === item.value && 'tabSortActive'}`}>
                            { item.name }
                        </div>
                    )) }
                </div>
            )

        }) }
    </div>
  )
}

export default Purpose