import React, {useState, useEffect} from 'react'
import { GetServerSideProps } from 'next';
import { Layout, Property } from '../components'
import Router, { useRouter } from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../states';
import { SavedPropertiesPageProps } from '../types';
import Heading from '../components/heading';
import { Loader } from '../components/loader';
import Cookies from 'universal-cookie';

const SavedProperties: React.FC<SavedPropertiesPageProps> = () => {
  const router = useRouter();

  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const filteredProperties = []
  
  return (
    <Layout title='View your saved properties'>
        <div>
          <Heading heading={`${filteredProperties.length >= 1 ? 'Saved Properties' : 'You have no saved properties'}`} />

          <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center py-5'>
            {/* { filteredProperties.map((property) => {
                return (
                  <Property property={property.data()} key={property.id} />
                )
            })} */}
          </div>
        </div>
        <Loader />
    </Layout>
  )
}

export default SavedProperties

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
// } 