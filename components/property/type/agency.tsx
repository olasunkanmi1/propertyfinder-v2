import Image from 'next/image'
import {AgencyContainerProps}  from '@types'

const Agency: React.FC<AgencyContainerProps> = ({objects}) => {
    const { agency } = objects

  return (
    <div className='flex justify-between items-center'>
        { agency && <p className='truncate font-normal text-sm text-secondary w-[calc(100%-30px)]'> {agency.name} </p>}

        <div className="flex space-x-2 justify-center items-center w-[25px] h-[25px] relative rounded-full overflow-hidden border bg-secondary text-white">
            <Image 
                src={agency ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'} alt="Agency Logo" layout="fill" priority 
                blurDataURL={agency ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'}
            />
        </div>
    </div>
  )
}
export default Agency