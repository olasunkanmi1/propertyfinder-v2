import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  return (
    <div className="w-full ls:w-[300px] z-0">
        <div className="relative rounded-xl w-full h-[160px] overflow-hidden">
            <Skeleton height={160} />
        </div>

        <div className="flex flex-col p-2 gap-[5px]">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                    <div className='text-green-500 '> <Skeleton circle width={25} height={25} /> </div> 
                    <p className="font-bold font-lg leading-tight"> <Skeleton width={200} /> </p>
                </div>
                
                <div className="flex space-x-2 justify-center items-center w-[25px] h-[25px] relative rounded-full overflow-hidden border  text-white">
                    <Skeleton circle width={25} height={25} />
                </div>
            </div>

            <div className="flex justify-between items-center font-normal">
                <p className='propertyBBA'> <Skeleton circle width={20} height={20} /> <Skeleton width={40} /> </p>
                <p className='propertyBBA'>  <Skeleton circle width={20} height={20} /> <Skeleton width={40} /> </p>
                <p className='propertyBBA'> <Skeleton circle width={20} height={20} />  <Skeleton width={40} /> </p>
            </div>

            <p className='truncate font-medium'> <Skeleton /> </p>
            <p className='truncate font-normal text-sm text-secondary'> <Skeleton /> </p>
        </div>
    </div>
  )
}

export default CardSkeleton