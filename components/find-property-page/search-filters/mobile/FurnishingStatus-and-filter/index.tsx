import { useRecoilState } from 'recoil'
import FurnishingStatus from './furnishing-status'
import { layoutState } from '@states'
import { MdOutlineTune } from 'react-icons/md'

const FurnishingStatusAndFilter = () => {
    const [layout, setLayout] = useRecoilState(layoutState);
    const { isFilterbarOpen } = layout;

  const toggleFilterbar = () => {
      setLayout(layout => ({
            ...layout,
            isFilterbarOpen: !isFilterbarOpen
        }))
    }

  return (
    <div className='flex justify-between gap-3 mt-4'>
        <FurnishingStatus />

        <div className="flex items-center gap-2 bg-primary text-white text-sm p-2 rounded mb-3" onClick={toggleFilterbar}>
            <MdOutlineTune size={20} />
            <span className='hidden ms:flex'> FILTERS </span>
        </div>
    </div>
  )
}

export default FurnishingStatusAndFilter