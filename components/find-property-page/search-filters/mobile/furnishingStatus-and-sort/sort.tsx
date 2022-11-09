import React from 'react'
import { BsSortDown } from 'react-icons/bs';
import { filterData } from '../../../../../utils/filterData';

const Sort = () => {
  const sortBy = filterData.filter((filter) => filter.placeholder === 'Sort')

  return (
    <div className='flex items-center justify-end ls:justify-center gap-1 text-secondary font-bold'> 
        <BsSortDown size={25} />

        { sortBy.map((sort) => {
        const { items, placeholder } = sort;

        return (
            <select className="flex outline-none text-sm appearance-none bg-transparent" key={placeholder}
            onChange={(e) => {}}
            > 
                <option value='popular'> Popular </option>
            { items?.map((item) => (
                <option key={item.name} value={item.value}> {item.name} </option>
            )) }
            </select>
        )
        }) }
    </div> 
  )
}

export default Sort