import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HomepageProps } from '../../../types'
import Heading from '../../heading';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedAgencies: React.FC<HomepageProps> = ({featuredAgencies}) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    window.addEventListener('resize', () => setScreenSize(window.innerWidth))
  }, []);

  return (
    <div className='space-y-4 relative mx-auto'>
      <Heading heading='Featured Agencies' />

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={screenSize && screenSize < 400 ? 1 : screenSize && screenSize < 720 ? 2 : 3}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {
          featuredAgencies?.map((agency) => {
            return (
              <SwiperSlide key={agency.id} className="flex flex-col items-center mb-[40px] px-[40px] space-y-2">
                <div className="w-full h-[100px] relative">
                  <Image src={agency.logo.url} alt="logo" layout="fill" objectFit='contain' loading='lazy' />
                </div>

                <p className='text-center text-secondary mx-2'> {agency.name} </p>
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