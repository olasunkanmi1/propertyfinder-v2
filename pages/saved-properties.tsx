import React, {useState, useEffect} from 'react'
import { GetServerSideProps } from 'next';
import { Layout, Property } from '../components'
import Router, { useRouter } from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../states';
import { Property as Pty, SavedPropertiesPageProps } from '../types';
import Heading from '../components/heading';
import { Loader } from '../components/loader';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { fetchUser } from '../utils/fetchUser';

const SavedProperties: React.FC= () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [savedProperties, setSavedProperties] = useState<Pty[]>([]);
  const router = useRouter();

  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading(loading => ({...loading, propertiesLoading: false, routeChangeLoading: false})) );

  useEffect(() => {
    axios.get("property", { withCredentials: true })
      .then(async (res) => {
        setLoadingPage(false);

        if (res.status === 200) {
          setSavedProperties(res.data.savedProperties)
        }
      })
      .catch((error) => {
        setLoadingPage(false);

        console.log(error)
      })
  }, [])
  

  
  return (
    <Layout title='View your saved properties'>
      { loadingPage ? (
        <Loader />
      ) : (
        <div>
          <Heading heading={`${savedProperties.length >= 1 ? 'Saved Properties' : 'You have no saved properties'}`} />

          <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center py-5'>
            { savedProperties && savedProperties.map((property) => {
                return (
                  <Property property={property} key={property.externalID} />
                )
            })}
          </div>
        </div>
      ) }
    </Layout>
  )
}

export default SavedProperties

export const getServerSideProps: GetServerSideProps = async () => {
  let res;

  try {
    const user = await fetchUser();
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    res = {
      user,
    }
  } catch (error) {
    if (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    } else {
      throw error;
    }
  }

  return {
    props: {
      res,
    },
  };
};