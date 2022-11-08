import React from 'react'
import DesktopAndTabs from './desktopAndTabs'
import MobileFilters from './mobile'

const SearchFilters = () => {
  return (
    <div>
        <DesktopAndTabs />
        <MobileFilters />
    </div>
  )
}

export default SearchFilters