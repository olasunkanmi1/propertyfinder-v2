import EmiratesAndFilterIcon from './emirates-and-filterIcon'
import FurnishingStatusAndSort from './furnishingStatus-and-sort'
import Searchbox from '../searchbox'

const MobileFilters = () => {
  return (
    <div className='flex flex-col md:hidden space-y-4'>
        <Searchbox />
        <EmiratesAndFilterIcon />
        <FurnishingStatusAndSort />
    </div>
  )
}

export default MobileFilters