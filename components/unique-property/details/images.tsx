import {useState, useEffect} from 'react'
import { UniquePropertyPageProps } from '../../../types';
import Image from 'next/image'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSetRecoilState } from 'recoil';
import { navbarState } from '../../../states';

import 'swiper/css';
import 'swiper/css/navigation';

const Images: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  const setModal = useSetRecoilState(navbarState)
  const { photos  } = propertyDetails;

  const openModal = (index: number, e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const clickedOnNavIcon = e.target instanceof HTMLElement && e.target.classList.contains('swiper-button-prev') || e.target instanceof HTMLElement && e.target.classList.contains('swiper-button-next');
    if (clickedOnNavIcon) {
      return;
    }

    setModal(modal => ({
      ...modal,
      imageModal: true,
      modalImages: photos.map(photo => photo.url),
      initialSlide: index
    }))
  }

  return (
    <>
      <div className='flex flex-col ms:h-[300px] md:h-[350px] h-[250px]'>
        <Swiper
          spaceBetween={10}
          navigation={true}
          initialSlide={0}
          modules={[Navigation]}
          className="ms:min-h-[300px] md:min-h-[350px] min-h-[250px] h-full w-full"
        >
          { photos.map((photo, index) => {
              return (
                  <SwiperSlide key={photo.url} className="relative h-full w-full cursor-pointer">
                    <Image
                        src={photo.url} alt="photo" layout="fill" loading='lazy' placeholder='blur'
                        blurDataURL={photo.url} onClick={(e) => openModal(index, e)}
                    />
                  </SwiperSlide>
                )
            })}
        </Swiper>

      </div>
      <p className='mx-auto text-primary font-semibold'> click to expand </p>
    </>
  )
}

export default Images