import {useState, useEffect} from 'react';
import { GetServerSideProps } from 'next';
import { Layout, Property } from '../components'
import Router, { useRouter } from "next/router";
import { useSetRecoilState, useRecoilState } from 'recoil';
import { loadingState, propertiesState } from '../states';
import { SavedPropertiesPageProps } from '../types';
import Heading from '../components/heading';
import axios from 'axios';
import CardSkeleton from '../components/property/skeleton';
import { Loader } from '../components/loader';

const SavedProperties: React.FC<SavedPropertiesPageProps> = ({savedProperties}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const setRouteLoading = useSetRecoilState(loadingState);
  const [properties, setProperties] = useRecoilState(propertiesState);

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
      {loading ? <Loader /> : <Heading heading={`${properties.savedProperties && properties.savedProperties.length >= 1 ? 'Saved Properties' : 'You have no saved properties'}`} /> }

      <div className='flex flex-wrap justify-center gap-x-5 gap-y-10 w-full py-5'>
        { loading ? (
          [...Array(3)].map((arr, index) => <CardSkeleton key={index} />)
        ) : (
          properties.savedProperties?.map((property) => {
              return (
                <Property property={property} key={property.externalID} />
              )
          })
        )}
      </div>
    </Layout>
  )
}

export default SavedProperties

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  let user;
  let savedProperties;
  
  const config = {
    withCredentials: true,
    headers: req.headers.cookie ? {
      Cookie: req.headers.cookie
    } : {
      Cookie: ''
    }
  };

  try {
    const {data} = await axios.get('user', config)
    user = await data
  } catch (error) {
    user = null
  }

  try {
    const {data} = await axios.get('property', config)
    savedProperties = await data.savedProperties
  } catch (error) {
    savedProperties = null
  }

  if(!user) {
    return {
        redirect: {
          permanent: false,
          destination: '/',
        },
    }
  }
    
  return {
    props: {
      savedProperties,
    },
  };
};