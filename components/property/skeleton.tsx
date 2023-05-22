import { useRecoilValue } from 'recoil';
import Skeleton from 'react-loading-skeleton'
import { propertiesState } from '@states';

import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  const properties = useRecoilValue(propertiesState);
  const {isList} = properties

  const GridSkeleton = () => {
    return (
        <>
            <Skeleton height={160} />
            <div className="flex flex-col gap-[5px]">
                <div className="flex justify-between items-center">
                    <div className='w-[calc(100%-40px)]'> <Skeleton /> </div>
                    <Skeleton circle width={30} height={30} />
                </div>
                <div className="flex justify-between items-center">
                    { [...Array(3)].map((_, i) => <div key={i} className='w-[25%]'> <Skeleton /> </div>) }
                </div>
                <Skeleton />  
                <div className="flex justify-between items-center">
                    <div className='w-[calc(100%-70px)]'> <Skeleton /> </div>
                    <Skeleton circle width={25} height={25} />
                </div>
            </div>
        </>
    )
  }

  return (
    <div className="grid-cols-1 overflow-hidden p-2 bg-[#ddd] bg-opacity-10 rounded-xl">
        <div className="hidden ls:block">
            { !isList ? (
                <GridSkeleton />
            ) : (
                <div className='flex space-x-2'>
                    <div className='w-1/2 md:w-[150px] xll:w-1/2'> <Skeleton height={160} /> </div>
                    <div className="flex flex-col justify-between w-1/2 md:w-[calc(100%-150px)] xll:w-1/2">
                        <Skeleton />  <Skeleton />
                        <div className="flex justify-between items-center">
                            { [...Array(3)].map((_, i) => <div key={i} className='w-[25%]'> <Skeleton /> </div>) }
                        </div>
                        <div className="flex justify-between items-center">
                            <div className='w-[calc(100%-40px)]'> <Skeleton /> </div>
                            <Skeleton circle width={30} height={30} />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className='w-[calc(100%-70px)]'> <Skeleton /> </div>
                            <Skeleton circle width={25} height={25} />
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className='block ls:hidden'> <GridSkeleton /> </div>
    </div>
  )
}

export default CardSkeleton