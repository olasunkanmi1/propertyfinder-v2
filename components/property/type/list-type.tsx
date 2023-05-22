import Link from 'next/link'
import {ImageContainer, Agency, Button, Location, Info} from '.';
import {PropertyTypeProps}  from '@types'

const ListType: React.FC<PropertyTypeProps> = ({objects}) => {
    const {
        title, externalID, toImg, toAgency, toBtn, toLocation, toInfo
    } = objects

  return (
    <div className='grid-cols-1 flex space-x-2 p-2 bg-[#ddd] bg-opacity-30 rounded-xl'>
        <Link href={`/property/${externalID}`} passHref>
            <a className="w-1/2 md:w-[150px] xll:w-1/2"> <ImageContainer objects={toImg} /> </a>
        </Link>
    
        <div className="flex flex-col justify-between w-1/2 md:w-[calc(100%-150px)] xll:w-1/2 space-y-2">
            <Link href={`/property/${externalID}`} passHref>
                <a className='flex items-center'>
                    <p className='overflow-hidden text-overflow-ellipsis whitespace-no-wrap font-medium leading-5'
                    style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    > {title} </p>
                </a>
            </Link>

            <Link href={`/property/${externalID}`} passHref>
                <a> <Info objects={toInfo} /> </a>
            </Link>

            <div className="flex justify-between items-center space-x-2">
                <Link href={`/property/${externalID}`} passHref>
                    <a className="flex space-x-1 items-center h-[30px] w-[calc(100%-38px)]">
                        <Location objects={toLocation} />
                    </a>
                </Link>

                <Button objects={toBtn} />
            </div>

            <Link href={`/property/${externalID}`} passHref>
                <a> <Agency objects={toAgency} /> </a>
            </Link>
        </div>
    </div>
  )
}
export default ListType