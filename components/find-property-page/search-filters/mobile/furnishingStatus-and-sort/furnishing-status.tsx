import React from 'react'
import { filterData } from '../../../../../utils/filterData';

const FurnishingStatus = () => {
  const furnishedStatus = filterData.filter((filter) => filter.placeholder === 'Furnish Type')

  return (
    <div className="flex items-center border rounded">
        { furnishedStatus.map((status) => {
            const { items, placeholder } = status;

            return (
                <div className="grid grid-cols-[25%,35%,40%] ls:flex w-full" key={placeholder}> 
                    <div className='furnishingStatusSort'>
                        All
                    </div>

                { items?.map((item) => (
                    <div key={item.name} className='furnishingStatusSort border-l'>
                    { item.name }
                    </div>
                )) }
                </div>
            )
        }) }
    </div>
  )
}

export default FurnishingStatus