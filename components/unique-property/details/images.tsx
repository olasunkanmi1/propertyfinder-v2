import {useState} from 'react'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UniquePropertyPageProps } from '@types';
import { layoutState } from '@states';
import {defaultPropertyImg} from '@public';

import 'swiper/css';
import 'swiper/css/navigation';

const Images: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
  const [imageError, setImageError] = useState(false);
  const setModal = useSetRecoilState(layoutState)
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
      <div className='flex flex-col h-[300px] md:h-[350px] '>
        <Swiper
          spaceBetween={10}
          navigation={true}
          initialSlide={0}
          modules={[Navigation]}
          className="min-h-[300px] md:min-h-[350px] h-full w-full propertyId"
        >
          { photos.map((photo, index) => {
              return (
                  <SwiperSlide key={photo.url} className="relative h-full w-full cursor-pointer">
                    <Image
                        src={!imageError ? photo.url : defaultPropertyImg} alt="photo" layout="fill" loading='lazy' placeholder='blur'
                        blurDataURL={defaultPropertyImg.blurDataURL} onClick={(e) => openModal(index, e)} onError={() => setImageError(true)}
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