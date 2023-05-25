import Link from 'next/link'
import {ImageContainer, Agency, Button, Location, Info} from '.';
import {PropertyTypeProps}  from '@types'

const ListType: React.FC<PropertyTypeProps> = ({objects}) => {
    const {
        title, externalID, toImg, toAgency, toBtn, toLocation, toInfo
    } = objects

  return (
    <div className='grid-cols-1 flex space-x-2 p-2 bg-[#ddd] bg-opacity-30 rounded-xl'>
        <Link href={`/property/${externalID}`} className="w-1/2 md:w-[160px] xll:w-1/2"> 
            <ImageContainer objects={toImg} forList /> 
        </Link>
    
        <div className="flex flex-col justify-between w-1/2 md:w-[calc(100%-160px)] xll:w-1/2 space-y-[5px]">
            <Link href={`/property/${externalID}`} className='flex items-center'>
                <p className='overflow-hidden text-overflow-ellipsis whitespace-no-wrap font-medium leading-5'
                style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                > {title} </p>
            </Link>

            <Link href={`/property/${externalID}`}>
                <Info objects={toInfo} /> 
            </Link>

            <div className="flex justify-between items-center space-x-2">
                <Link href={`/property/${externalID}`} className="flex space-x-1 items-center h-[30px] w-[calc(100%-38px)]">
                    <Location objects={toLocation} />
                </Link>

                <Button objects={toBtn} />
            </div>

            <Link href={`/property/${externalID}`}> <Agency objects={toAgency} /> </Link>
        </div>
    </div>
  )
}
export default ListType