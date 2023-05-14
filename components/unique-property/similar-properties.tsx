import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import { Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Property} from '@components'
import { SimilarPropertiesProps } from '@types'

import 'swiper/css';
import 'swiper/css/pagination';

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({similarProperties}) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const router = useRouter();
  const filteredProperties = similarProperties.filter((property) => property.externalID !== router.query.id)
    
  useEffect(() => {
    window.addEventListener('resize', () => setScreenSize(window.innerWidth))
  }, []);
    
  if(filteredProperties.length === 0) return null;

  return (
    <div className={`xll:w-full xll:overflow-hidden xll:border xll:p-2 xll:mx-auto ${filteredProperties.length > 1 ? 'xll:h-[660px]' : 'xll:h-[350px]'}`}>
      <h1 className='font-bold text-2xl mb-2 text-primary w-full xll:mx-auto'> Similar properties </h1>

      { screenSize && screenSize < 900 ? (
        <div className='flex gap-5 mx-auto pb-4 overflow-auto'>
            {filteredProperties.map((property) => {
                return (
                  <Property key={property.externalID} property={property} similar />
                )
            })}
        </div>
      ) : (
        <Swiper
          direction={"vertical"}
          slidesPerView={2}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className='w-full h-[calc(100%-40px)]'
        >
          {filteredProperties.map((property) => {
            return (
              <SwiperSlide key={property.externalID} className='max-h-[285px] mx-auto'>
                <Property key={property.externalID} property={property} similar />
              </SwiperSlide>            
            )
          })}
        </Swiper>
      )}
    </div>
  )
}

export default SimilarProperties