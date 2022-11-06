import React from 'react';
import { Layout, FindHome, FeaturedProperties, ForRent, ForSale, FeaturedAgencies } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { HomepageProps } from '../types';

const Home: React.FC<HomepageProps> = ({ featuredProperties, featuredAgencies }) => {
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