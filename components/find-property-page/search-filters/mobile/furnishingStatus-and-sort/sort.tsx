import React from 'react'
import { useRecoilState } from 'recoil'
import { BsSortDown } from 'react-icons/bs';
import { filterData } from '../../../../../utils/filterData';
import { filterAtom } from '../../../../../states';
import { findProperties } from '..';

const Sort = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const sortBy = filterData.filter((filter) => filter.placeholder === 'Sort');

  const setSortBy = (value: string, queryName: string) => {
    setFilterState(filterState => ({
         ...filterState,
         sort: value
     }))

     findProperties({ [queryName]: value })
  }

  return (
    <div className='flex items-center justify-end ls:justify-center gap-1 text-secondary font-bold'> 
        <BsSortDown size={25} />

        { sortBy.map((sort) => {
        const { items, placeholder, queryName } = sort;

        return (
            <select className="flex outline-none text-sm appearance-none bg-transparent" key={placeholder}
            onChange={(e) => setSortBy(e.target.value, queryName!)}
            > 
            { items?.map((item) => (
                <option selected={filterState.sort === item.value} key={item.name} value={item.value}> {item.name} </option>
            )) }
            </select>
        )
        }) }
    </div> 
  )
}

export default Sort