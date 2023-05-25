import { useRecoilValue } from 'recoil'
import LayoutSwitch from 'components/property/layout-switch'
import FurnishingStatus from './furnishing-status'
import Sort from './sort'
import { propertiesState } from '@states'

const FurnishingStatusAndSort = () => {
  const pts = useRecoilValue(propertiesState);
  const {properties} = pts;

  return (
    <div className='sfs:flex justify-between gap-1 mt-1'>
        <FurnishingStatus />

        <div className='flex justify-between'>
          <Sort />

          {properties?.length! > 0 && (
            <div className='hidden ls:flex sfs:hidden mt-3'>
              <LayoutSwitch />
            </div>
          )}
        </div>
    </div>
  )
}

export default FurnishingStatusAndSort