import React from 'react'
import { Layout } from '../components'
import Router from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../states';


const SavedProperties = () => {
  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );
  
  return (
    <Layout title='View your saved properties'>
        <h1>Saved Properties</h1>
    </Layout>
  )
}

export default SavedProperties