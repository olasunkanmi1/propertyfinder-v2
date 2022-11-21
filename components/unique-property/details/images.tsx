import React from 'react'
import { UniquePropertyPageProps } from '../../../types';
import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const Images: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { photos  } = propertyDetails;

  return (
    <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className='h-[300px] sm:h-[400px] w-full'
      > 
        {
          photos.map((photo) => {
            return (
              <SwiperSlide key={photo.url} className="relative">
                <Image
                    src={photo.url} alt="photo" layout="fill" priority
                    blurDataURL={photo.url}  
                />
              </SwiperSlide>
            )
          })
        }
      {/* ... */}
      </Swiper>
  )
}

export default Images