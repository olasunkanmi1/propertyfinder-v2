import {LocationContainerProps}  from '@types'

const Location: React.FC<LocationContainerProps> = ({objects}) => {
    const {HiOutlineLocationMarker, propertyLocation}= objects
  return (
    <>
        <span className='w-5 h-5 text-primary'> <HiOutlineLocationMarker size={20} /> </span>
        <p className="font-bold text-xs text-primary overflow-hidden text-overflow-ellipsis whitespace-no-wrap" 
            style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}
        > {propertyLocation}
        </p>
    </>
  )
}
export default Location