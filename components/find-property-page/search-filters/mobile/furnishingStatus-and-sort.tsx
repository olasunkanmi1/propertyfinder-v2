import React from 'react'
import { BsSortDown } from 'react-icons/bs'
import { filterData } from '../../../../utils/filterData'

const FurnishingStatusAndSort = () => {
  const furnishedStatus = filterData.filter((filter) => filter.placeholder === 'Furnish Type')
  const sortBy = filterData.filter((filter) => filter.placeholder === 'Sort')

  return (
    <div className='flex flex-col ls:flex-row justify-between space-y-2'>
        <div className="flex items-center border rounded w-fit mx-auto ls:mx-0">
          <div className='furnishingStatusSort'>
            All
          </div>

          { furnishedStatus.map((status) => {
            const { items, placeholder } = status;

            return (
              <div className="flex" key={placeholder}> 
                { items?.map((item) => (
                  <div key={item.name} className='furnishingStatusSort border-l'>
                    { item.name }
                  </div>
                )) }
              </div>
            )
          }) }
        </div>

        <div className='flex items-center justify-end ls:justify-center text-sm gap-1'> 
          <BsSortDown size={20} />

          { sortBy.map((sort) => {
            const { items, placeholder } = sort;

            return (
              <select className="flex outline-none appearance-none" key={placeholder}
                onChange={(e) => {}}
              > 
                { items?.map((item) => (
                  <option key={item.name} value={item.value}> {item.name} </option>
                )) }
              </select>
            )
          }) }
        </div> 
    </div>
  )
}

export default FurnishingStatusAndSort