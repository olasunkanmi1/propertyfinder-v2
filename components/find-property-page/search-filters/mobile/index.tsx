import React from 'react'
import EmiratesAndFilterIcon from './emirates-and-filterIcon'
import Searchbox from './searchbox'

const MobileFilters = () => {
  return (
    <div className='flex flex-col md:hidden space-y-4'>
        <Searchbox />
        <EmiratesAndFilterIcon />
    </div>
  )
}

export default MobileFilters