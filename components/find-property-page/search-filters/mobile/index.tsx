import FurnishingStatusAndFilter from './FurnishingStatus-and-filter'
import Emirates from './emirates'
import SortAndSwitch from './sort-and-switch'
import Searchbox from '../searchbox'

const MobileFilters = () => {
  return (
    <div className='flex flex-col md:hidden'>
      <div className='wrapper'>
        <Searchbox />
        <FurnishingStatusAndFilter />
      </div>

      <Emirates />
      <SortAndSwitch />
    </div>
  )
}

export default MobileFilters