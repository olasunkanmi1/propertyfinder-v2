import {useState} from 'react'
import Image from 'next/image'
import { useRecoilState } from "recoil";
import { AiOutlineClose } from 'react-icons/ai';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { layoutState } from "@states";
import {defaultPropertyImg} from '@public';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageModal = () => {
  const [imageError, setImageError] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const closeModal = () => setModal(modal => ({...modal, imageModal: false}))

  return (
    <>
        { modal.imageModal && (
            <div className='flex flex-col h-[366px] ls:h-[416px] max-h-[calc(100vh-80px)] top-[calc(50%+20px)] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-2 bg-white rounded-md w-[calc(100%-16px)] xll:w-[800px] z-[25] fixed overflow-auto'>
                <div className="relative h-full">
                    <AiOutlineClose size={28} className='absolute top-0 right-0 text-primary cursor-pointer bg-white z-[26] p-1' onClick={closeModal} />

                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        pagination={{clickable: true}}
                        initialSlide={modal.initialSlide}
                        modules={[Navigation, Pagination]}
                        className="min-h-[300px] h-full w-full propertyId"
                    >
                        {
                            modal.modalImages.map((photo) => {
                                return (
                                    <SwiperSlide key={photo} className="relative h-full w-full">
                                        <Image
                                            src={!imageError ? photo: defaultPropertyImg} alt="photo" fill loading='lazy' placeholder='blur'
                                            blurDataURL={defaultPropertyImg.blurDataURL} onError={() => setImageError(true)}
                                            className='object-cover'
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