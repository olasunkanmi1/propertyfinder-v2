import Link from 'next/link'
import {ImageContainer, Agency, Button, Location, Info} from '.';
import {PropertyTypeProps}  from '@types'

const GridType: React.FC<PropertyTypeProps> = ({objects}) => {
    const {
        similar, title, externalID, toImg, toAgency, toBtn, toLocation, toInfo
    } = objects

  return (
    <div className={`grid-cols-1 p-2 bg-[#ddd] bg-opacity-30 rounded-xl ${similar ? 'max-w-[280px] mx-auto' : ''}`}>
        <Link href={`/property/${externalID}`} passHref>
            <a className="w-full"> <ImageContainer objects={toImg} /> </a>
        </Link>
    
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <Link href={`/property/${externalID}`} passHref>
                    <a className='flex items-center w-[calc(100%-35px)] h-[38px] pt-2'>
                        <p className='truncate font-medium'> {title} </p>
                    </a>
                </Link>

                <Button objects={toBtn} forGrid />
            </div>

            <Link href={`/property/${externalID}`} passHref>
                <a className='pt-[5px]'>
                    <Info objects={toInfo} />

                    <div className="flex space-x-1 items-center h-[30px] mt-1"> 
                        <Location objects={toLocation} /> 
                    </div>

                    <Agency objects={toAgency} />
                </a>
            </Link>
        </div>
    </div>
  )
}
export default GridType