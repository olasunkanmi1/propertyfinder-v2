import React from 'react'
import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HomepageProps } from '../../../types'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedAgencies: React.FC<HomepageProps> = ({featuredAgencies}) => {
  console.log(featuredAgencies)
  return (
    <div className='space-y-4 px-20  relative mx-auto'>
      <h1 className="mx-auto text-4xl text-primary font-semibold items-center w-max"> Featured Agencies </h1>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {
          featuredAgencies?.map((agency) => {
            return (
              <SwiperSlide key={agency.id} className="flex flex-col items-center mb-[40px] px-[25px] space-y-2">
                <div className="w-[200px] h-[100px] relative">
                  <Image src={agency.logo.url} alt="logo" layout="fill" objectFit='contain' priority />
                </div>

                <p className='text-center w-[90%]'> {agency.name} </p>
              </SwiperSlide>
            )
          })
        }
      {/* ... */}
      </Swiper>
    </div>
  )
}

export default FeaturedAgencies