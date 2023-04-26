import {useState, useEffect} from 'react'
import { UniquePropertyPageProps } from '../../../types';
import Image from 'next/image'
import { Navigation, Thumbs, FreeMode, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import "swiper/css/free-mode";

const Images: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const { photos  } = propertyDetails;

    useEffect(() => {
    window.addEventListener('resize', () => setScreenSize(window.innerWidth))
  }, []);

  return (
    <div className='flex flex-col h-[390px]'>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        initialSlide={0}
        modules={[FreeMode, Navigation, Thumbs]}
        className="max-h-[300px] w-full"
        onSwiper={(swiper) => swiper.slideTo(0)}
      >
        {
          photos.map((photo) => {
            return (
                <SwiperSlide key={photo.url} className="relative">
                  <Image
                      src={photo.url} alt="photo" layout="fill" loading='lazy' placeholder='blur'
                      blurDataURL={photo.url}  
                  />
                </SwiperSlide>
              )
            })
          }
      </Swiper>
      
      <Swiper
        onClick={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={screenSize && screenSize < 350 ? 2 : screenSize && screenSize < 450 ? 3 : screenSize && screenSize < 720 ? 4 : 5}
        freeMode={true}
        initialSlide={0} 
        watchSlidesProgress={true}
        scrollbar={{ draggable: true }}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className="box-border max-h-[90px] bg-primary bg-opacity-60 pt-[10px] mySwiper"
      >
        {
          photos.map((photo) => {
            return (
                <SwiperSlide key={photo.url} className="relative">
                  <Image
                      src={photo.url} alt="photo" layout="fill" loading='lazy' placeholder='blur'
                      blurDataURL={photo.url}  
                  />
                </SwiperSlide>
              )
            })
          }
      </Swiper>
    </div>
  )
}

export default Images