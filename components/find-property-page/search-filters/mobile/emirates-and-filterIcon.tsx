import React from 'react'
import { useRecoilState } from 'recoil'
import { MdOutlineTune } from 'react-icons/md'
import { filterData } from '../../../../utils/filterData'
import { navbarState } from '../../../../states'

const EmiratesAndFilterIcon = () => {
  const [filterbarOpen, setFilterbarOpen] = useRecoilState(navbarState);
  const { isFilterbarOpen } = filterbarOpen;
  const emirates = filterData.filter((filter) => filter.placeholder === 'Emirates')

    const toggleSidebar = () => {
      setFilterbarOpen(filterbarOpen => ({
            ...filterbarOpen,
            isFilterbarOpen: !isFilterbarOpen
        }))
    }

  return (
    <div className='flex justify-between '>
        <div className="flex justify-between rounded overflow-auto w-[calc(100%-43px)] ms:w-[calc(100%-105px)] pb-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
          { emirates.map((emirate) => {
            const { items, placeholder } = emirate;

            return (
              <div className="flex gap-1" key={placeholder}> 
                { items?.map((item) => (
                  <div key={item.name} className='flex p-2 border rounded w-max cursor-pointer duration-300 ease-in-out select-none hover:bg-secondary hover:text-white'>
                    { item.name }
                  </div>
                )) }
              </div>
            )
          }) }
        </div>

        <div className="flex items-center gap-2 bg-primary text-white text-sm p-2 rounded ms:w-[98px] mb-3" onClick={toggleSidebar}>
            <MdOutlineTune size={20} />
            <span className='hidden ms:flex'> FILTERS </span>
        </div>
    </div>
  )
}

export default EmiratesAndFilterIcon