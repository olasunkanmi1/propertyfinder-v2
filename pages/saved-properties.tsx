import React from 'react'
import { GetServerSideProps } from 'next';
import { Layout } from '../components'
import Router from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../states';
import { SavedPropertiesPageProps } from '../types';
import { getProviders } from 'next-auth/react';

const SavedProperties: React.FC<SavedPropertiesPageProps> = ({providers}) => {
  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );
  
  return (
    <Layout title='View your saved properties' providers={providers}>
        <h1>Saved Properties</h1>
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