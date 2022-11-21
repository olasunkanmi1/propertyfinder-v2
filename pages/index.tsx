import React from 'react';
import { Layout, FindHome, FeaturedProperties, ForRent, ForSale, FeaturedAgencies } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { HomepageProps } from '../types';
import Router from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../states';

const Home: React.FC<HomepageProps> = ({ featuredProperties, featuredAgencies }) => {
  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

  return (
    <Layout title="Find your dream property">
      <FindHome />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <ForRent />
      <ForSale />
      <FeaturedAgencies featuredAgencies={featuredAgencies} />
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const featuredProperties = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&hitsPerPage=6`)
  const featuredAgencies = await fetchApi(`${baseUrl}/agencies/list?query=.`, FeaturedAgencies)

  return {
    props: {
      featuredProperties: featuredProperties?.hits,
      featuredAgencies: featuredAgencies,
    }
  }
}