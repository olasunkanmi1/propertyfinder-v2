import LayoutSwitch from 'components/property/layout-switch'
import FurnishingStatus from './furnishing-status'
import Sort from './sort'

const FurnishingStatusAndSort = () => {
  return (
    <div className='sfs:flex justify-between gap-1 mt-1'>
        <FurnishingStatus />

        <div className='flex justify-between'>
          <Sort />
          <div className='hidden ls:flex sfs:hidden mt-3'>
            <LayoutSwitch />
          </div>
        </div>
    </div>
  )
}

export default FurnishingStatusAndSort