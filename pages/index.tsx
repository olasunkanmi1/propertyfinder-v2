import React, {useState, useEffect} from 'react';
import { Layout, FindHome, FeaturedProperties, ForRent, ForSale, FeaturedAgencies } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { HomepageProps } from '../types';
import Router from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState, propertiesState } from '../states';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const Home: React.FC<HomepageProps> = ({ featuredProperties, featuredAgencies, savedProperties }) => {
  const [loading, setLoading] = useState(true);
  const setRouteLoading = useSetRecoilState(loadingState);
  const setProperties = useSetRecoilState(propertiesState);

  useEffect(() => {
    setProperties({
      featuredProperties: featuredProperties,
      savedProperties: savedProperties
    });

    setLoading(false)
  }, [savedProperties, featuredProperties, setProperties])

  Router.events.on("routeChangeStart", () => setRouteLoading(routeLoading => ({...routeLoading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setRouteLoading(routeLoading => ({...routeLoading, propertiesLoading: false, routeChangeLoading: false})) );

  return (
    <Layout title="Find your dream property">
      <FindHome />
      <FeaturedProperties loading={loading} />
      <ForRent />
      <ForSale />
      <FeaturedAgencies featuredAgencies={featuredAgencies} />
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const featuredProperties = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5001&hitsPerPage=6`);
  const featuredAgencies = await fetchApi(`${baseUrl}/agencies/list?query=.`, FeaturedAgencies);

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
    const {data} = await axios.get(`${process.env.BACKEND_URL}/property`, config)
    savedProperties = await data.savedProperties
  } catch (error) {
    savedProperties = null
  }

  return {
    props: {
      featuredProperties: featuredProperties?.hits,
      featuredAgencies,
      savedProperties
    },
  };
}