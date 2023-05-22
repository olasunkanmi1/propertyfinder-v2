import millify from "millify";
import {ImageContainerProps}  from '@types'

const ImageContainer: React.FC<ImageContainerProps> = ({objects}) => {
    const { coverPhoto, Image, imgUrl, setImgUrl, GoVerified, rentFrequency, defaultPropertyImg,isVerified, product, price } = objects

  return (
    <div className="relative rounded-xl w-full h-[160px] overflow-hidden">
        <Image
            src={coverPhoto && imgUrl ? imgUrl : defaultPropertyImg} alt="cover-photo" layout="fill"
            placeholder="blur" blurDataURL={defaultPropertyImg.blurDataURL} loading="lazy" onError={() => setImgUrl(defaultPropertyImg)}
        />

        { isVerified && <div className='text-green-500 absolute top-2 left-2 rounded-full bg-white p-1 shadow-md'> <GoVerified size={20} /> </div> }
        { product === 'superhot' && 
            <div className='bg-green-500 text-white text-sm absolute top-2 right-0 px-1 shadow-md'> 
                <div className="relative bg-green-500 text-white">
                    <div className="absolute -left-[19px] top-[5px] w-0 h-0 border-x-[10px] border-x-transparent border-b-[10px] border-b-green-500 transform -rotate-90" />
                    <span className="relative z-10">POPULAR</span>
                </div>
            </div> 
        }
        <p className="absolute bottom-2 right-2 p-1 rounded-md text-primary bg-white font-bold font-lg shadow-md leading-tight"> AED {millify(price)} {rentFrequency && ` ${rentFrequency}`} </p>
    </div>
  )
}
export default ImageContainer