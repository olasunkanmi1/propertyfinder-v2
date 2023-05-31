import { useRouter } from 'next/router'
import { Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Property} from '@components'
import { SimilarPropertiesProps } from '@types'

import 'swiper/css';
import 'swiper/css/pagination';

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({similarProperties}) => {
  const router = useRouter();
  const filteredProperties = similarProperties.filter((property) => property.externalID !== router.query.id)
    
  if(filteredProperties.length === 0) return null;

  return (
    <div className={`lg:w-full lg:overflow-hidden lg:border lg:p-2 lg:mx-auto ${filteredProperties.length > 1 ? 'lg:h-[750px]' : 'lg:h-[390px]'}`}>
      <h1 className='font-bold text-xl mb-2 text-primary w-full lg:mx-auto wrapper lg:p-0'> Similar {filteredProperties.length > 1 ? 'properties' : 'property'} </h1>

      <div className='flex gap-5 mx-auto pb-4 overflow-auto lg:hidden px-3 sm:px-8'>
          {filteredProperties.map((property) => {
              return (
                <Property key={property.externalID} property={property} similar />
              )
          })}
      </div>
      
      <Swiper
        direction={"vertical"}
        slidesPerView={2}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className='w-full h-[700px] hidden lg:block'
      >
        {filteredProperties.map((property) => {
          return (
            <SwiperSlide key={property.externalID} className='mx-auto'>
              <Property key={property.externalID} property={property} similar />
            </SwiperSlide>            
          )
        })}
      </Swiper>
    </div>
  )
}

export default SimilarProperties