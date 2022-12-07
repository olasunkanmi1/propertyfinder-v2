import React, {useState, useEffect} from 'react'
import { GetServerSideProps } from 'next';
import { Layout, Property } from '../components'
import Router, { useRouter } from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../states';
import { SavedPropertiesPageProps } from '../types';
import { getProviders, useSession } from 'next-auth/react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import Heading from '../components/heading';
import { Loader } from '../components/loader';

const SavedProperties: React.FC<SavedPropertiesPageProps> = ({providers}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const filteredProperties = savedProperties.filter((filter) => filter.data().userId = session?.user?.email)

  useEffect(() => {
    if(!session) router.push('/')
  }, [session, router])

  useEffect(() => onSnapshot(
    query(collection(db, "saved-properties"), orderBy("timestamp", "desc")), //descending
      (snapshot) => {
        // console.log('properties', snapshot.docs[0].data())
        setSavedProperties(snapshot.docs)
      }
  )
, [])
  
  // console.log('properties', savedProperties)

  
  return (
    <Layout title='View your saved properties' providers={providers}>
      { session ? (
        <div>
          <Heading heading={`${filteredProperties.length >= 1 ? 'Saved Properties' : 'You have no saved properties'}`} />

          <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center py-5'>
            { filteredProperties.map((property) => {
                return (
                  <Property property={property.data()} key={property.id} />
                )
            })}
          </div>
        </div>
      ) : (
        <Loader />
      ) }
    </Layout>
  )
}

export default SavedProperties

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
} 