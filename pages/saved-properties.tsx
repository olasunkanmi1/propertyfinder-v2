import {useState, useEffect} from 'react';
import { Layout, Property } from '../components'
import Router, { useRouter } from "next/router";
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loadingState, propertiesState, navbarState } from '../states';
import { SavedPropertiesPageProps } from '../types';
import Heading from '../components/heading';
import CardSkeleton from '../components/property/skeleton';
import { Loader } from '../components/loader';
import { AiOutlineDelete } from 'react-icons/ai';
import Image from 'next/image'
import homeNotFound from "../public/assets/homeNotFound.webp";
import { getServerSideProps } from '../utils/getServerSideFns/savedProperties';

const SavedProperties: React.FC<SavedPropertiesPageProps> = ({savedProperties}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const setRouteLoading = useSetRecoilState(loadingState);
  const setModal = useSetRecoilState(navbarState);
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

  Router.events.on("routeChangeStart", () => setRouteLoading(routeLoading => ({...routeLoading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setRouteLoading(routeLoading => ({...routeLoading, propertiesLoading: false, routeChangeLoading: false})) );
  
  return (
    <Layout title='View your saved properties'>
      <div>
        {loading ? <Loader /> : <Heading heading={`${properties.savedProperties && properties.savedProperties.length >= 1 ? 'Saved Properties' : 'You have no saved properties'}`} /> }
        { !loading && properties.savedProperties?.length! > 1 ? (
          <button type='button' onClick={showModal} className='flex justify-center items-center py-1 px-2 mt-3 bg-primary text-white ml-auto rounded-md'> <AiOutlineDelete size={20} className='mr-2' /> Clear All </button>
        ) : null }

        <div className='gridLayout my-5'>
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

        {properties.savedProperties?.length === 0 && (
          <div className='mb-4 relative w-full h-[300px] md:w-[400px] md:h-[400px] mx-auto'>
            <Image src={homeNotFound} alt="no saved properties" layout='fill'  placeholder="blur" blurDataURL={homeNotFound.blurDataURL} loading='lazy' />
          </div>
        )} 
      </div>
    </Layout>
  )
}

export default SavedProperties

export { getServerSideProps }