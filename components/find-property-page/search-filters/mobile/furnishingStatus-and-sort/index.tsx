import FurnishingStatus from './furnishing-status'
import Sort from './sort'

const FurnishingStatusAndSort = () => {
  return (
    <div className='sfs:flex justify-between gap-1 mt-1'>
        <FurnishingStatus />
        <Sort />
    </div>
  )
}

export default FurnishingStatusAndSort