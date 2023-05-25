import {useState, useEffect} from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { AiOutlineDelete } from 'react-icons/ai';
import Image from 'next/image'
import {homeNotFound} from "@public";
import { propertiesState, layoutState } from '@states';
import { SavedPropertiesPageProps } from '@types';
import { Layout, Property, Heading, Loader, CardSkeleton } from '@components'
import { savedPropertiesGSSP } from '@utils';

const SavedProperties: React.FC<SavedPropertiesPageProps> = ({savedProperties}) => {
  const [loading, setLoading] = useState(true);
  const setModal = useSetRecoilState(layoutState);
  const [properties, setProperties] = useRecoilState(propertiesState);

  const showModal = () => {
    setModal(modal => ({
      ...modal,
      clearConfirmationModal: true
    }))
    
  }

  useEffect(() => {
    setProperties(properties => ({
      ...properties,
      savedProperties: savedProperties
    }));

    setLoading(false)
  }, [savedProperties, setProperties])
  
  return (
    <Layout title='View your saved properties'>
      <div className='space-y-3 mb-5'>
        {loading ? <Loader /> : 
          <Heading forProperty={properties.savedProperties?.length === 0 ? false : true}
            heading={`${properties.savedProperties && properties.savedProperties.length >= 1 ? 'Saved Properties' : 'You have no saved properties'}`} 
          /> 
        }

        { !loading && properties.savedProperties?.length! > 1 ? (
          <button type='button' onClick={showModal} className='flex justify-center items-center py-1 px-2 bg-primary text-white ml-auto rounded-md'> <AiOutlineDelete size={20} className='mr-2' /> Clear All </button>
        ) : null }


        {properties.savedProperties?.length === 0 && !loading ?  (
          <div className='mb-4 relative w-full h-[300px] md:w-[400px] md:h-[400px] mx-auto'>
            <Image src={homeNotFound} alt="no saved properties" layout='fill'  placeholder="blur" blurDataURL={homeNotFound.blurDataURL} loading='lazy' />
          </div>
        ) : (
          <div className={`grid grid-cols-1 gap-y-6 gap-x-4 ${properties.isList ? 'listLayout md:grid-cols-2' : 'gridLayout sm:grid-cols-3 lg:grid-cols-4'}`}>
            { loading ? (
              [...Array(4)].map((arr, index) => <CardSkeleton key={index} />)
            ) : (
              properties.savedProperties?.map((property) => {
                  return (
                    <Property property={property} key={property.externalID} />
                  )
              })
            )}
          </div>
        )} 
      </div>
    </Layout>
  )
}

export default SavedProperties

export const getServerSideProps = savedPropertiesGSSP;