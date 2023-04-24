import Link from 'next/link';
import Image from 'next/image';
import { SectionLayoutProps } from '../../types';
import { AiOutlineSearch } from 'react-icons/ai'

const SectionLayout: React.FC<SectionLayoutProps> = ({ heading, paragraph, text, buttonText, route, image, reverse, noIcon, firstImg }) => {
  return (
    <div className="md:flex overflow-hidden justify-between gap-4 space-y-4">
      <div className="flex flex-col justify-center space-y-4 md:w-1/2">
        <h1 className="bg-secondary py-2 px-4 text-white font-medium text-sm sm:text-lg rounded-xl w-max"> {heading} </h1>
        <p className="text-primary font-medium text-2xl sm:text-4xl"> {paragraph} </p>
        <p className="text-gray-500 font-medium sm:text-lg"> {text} </p>
        
        <Link href={route} passHref>
          <a className='flex items-center space-x-2 p-2 text-white font-sm rounded-lg w-max bg-primary hover:scale-105 transition duration-500 ease-in-out border-2 border-white drop-shadow-lg mx-auto'> 
            { !noIcon && <AiOutlineSearch size={18} /> }
            <p> {buttonText} </p>
          </a>
        </Link>
      </div>
      
      <div className={`md:w-1/2 md:h-[400px] h-[300px] relative ${reverse ? 'order-first' : ''}`}>
        { firstImg ? (
          <Image src={image} alt="illustration" layout="fill" priority placeholder="blur" blurDataURL={image.blurDataURL} />          
          ) : (
          <Image src={image} alt="illustration" layout="fill" loading="lazy" placeholder="blur" blurDataURL={image.blurDataURL} />
        ) }
      </div>
    </div>
  )
} 

export default SectionLayout