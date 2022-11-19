import React from 'react'
import { UniquePropertyPageProps } from '../../../types';
import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Images: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const { photos  } = propertyDetails;

  return (
    <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className='h-[400px] w-full'
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