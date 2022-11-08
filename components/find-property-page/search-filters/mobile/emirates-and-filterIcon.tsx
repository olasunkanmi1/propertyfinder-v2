import React from 'react'
import { MdOutlineTune } from 'react-icons/md'
import { filterData } from '../../../../utils/filterData'

const EmiratesAndFilterIcon = () => {
  const emirates = filterData.filter((filter) => filter.placeholder === 'Emirates')

  return (
    <div className='flex justify-between '>
        <div className="flex justify-between rounded overflow-auto w-[calc(100%-43px)] ms:w-[calc(100%-105px)] pb-3">
          { emirates.map((emirate) => {
            const { items, placeholder } = emirate;

            return (
              <div className="flex gap-1" key={placeholder}> 
                { items?.map((item) => (
                  <div key={item.name} className='border rounded flex items-center p-2 w-max'>
                    { item.name }
                  </div>
                )) }
              </div>
            )
          }) }
        </div>

        <div className="flex items-center gap-2 bg-primary text-white text-sm p-2 rounded ms:w-[98px] mb-3">
            <MdOutlineTune size={20} />
            <span className='hidden ms:flex'> FILTERS </span>
        </div>
    </div>
  )
}

export default EmiratesAndFilterIcon