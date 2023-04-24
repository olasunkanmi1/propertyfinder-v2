import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  return (
    <div className="grid-cols-1 overflow-hidden">
        <Skeleton height={160} />
        <div className="flex flex-col p-2 gap-[5px]">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                    <Skeleton circle width={25} height={25} />
                    <Skeleton width={90} />
                </div>
                <Skeleton circle width={25} height={25} />
            </div>
            <div className="flex justify-between items-center font-normal">
                <Skeleton width={40} /> <Skeleton width={40} /> <Skeleton width={40} />
            </div>
            <Skeleton />  <Skeleton />
        </div>
    </div>
  )
}

export default CardSkeleton