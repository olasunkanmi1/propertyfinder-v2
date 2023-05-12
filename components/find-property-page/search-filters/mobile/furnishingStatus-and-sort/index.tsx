import FurnishingStatus from './furnishing-status'
import Sort from './sort'

const FurnishingStatusAndSort = () => {
  return (
    <div className='flex flex-col ls:flex-row justify-between gap-2'>
        <FurnishingStatus />
        <Sort />
    </div>
  )
}

export default FurnishingStatusAndSort