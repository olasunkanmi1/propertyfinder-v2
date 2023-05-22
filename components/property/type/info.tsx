import millify from "millify";
import {InfoContainerProps}  from '@types'

const Info: React.FC<InfoContainerProps> = ({objects}) => {
    const {FaBed, FaBath, MdWindow, rooms, baths, area} = objects

  return (
    <div className="flex justify-between items-center font-normal flex-wrap gap-x-2 h-[40px]">
        <p className='propertyBBA'> <FaBed />{rooms} </p>
        <p className='propertyBBA'> <FaBath />{baths} </p>
        <p className='propertyBBA'> <MdWindow />{millify(area)} sqft  </p>
    </div>
  )
}
export default Info