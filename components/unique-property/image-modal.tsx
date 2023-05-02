import {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRecoilState, useResetRecoilState } from "recoil";
import { navbarState } from "../../states";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiOutlineClose } from 'react-icons/ai';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageModal = () => {
    const [modal, setModal] = useRecoilState(navbarState);
    const closeModal = useResetRecoilState(navbarState);

  return (
    <>
        { modal.imageModal && (
            <div className='flex flex-col h-[506px] max-h-[calc(100vh-80px)] top-[calc(50%+20px)] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-2 bg-white rounded-md w-[calc(100%-32px)] xll:w-[800px] z-[25] fixed'>
                <div className="relative">
                    <AiOutlineClose size={28} className='absolute top-0 right-0 text-primary cursor-pointer bg-white z-[26] p-1' onClick={closeModal} />

                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        pagination={true}
                        initialSlide={modal.initialSlide}
                        modules={[Navigation, Pagination]}
                        className="min-h-[400px] max-h-[400px] h-[400px] w-full"
                    >
                        {
                            modal.modalImages.map((photo) => {
                                return (
                                    <SwiperSlide key={photo} className="relative">
                                        <Image
                                            src={photo} alt="photo" layout="fill" loading='lazy' placeholder='blur'
                                            blurDataURL={photo}  
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        )}
    </>
  )
}
export default ImageModal