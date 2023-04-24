import {useState, useEffect} from 'react';
import { Layout, FindHome, FeaturedProperties, ForRent, ForSale, FeaturedAgencies } from "../components";
import { useSetRecoilState } from 'recoil';
import { HomepageProps } from '../types';
import { propertiesState } from '../states';
import { getServerSideProps } from '../utils/getServerSideFns/homepage'

const Home: React.FC<HomepageProps> = ({ featuredProperties, featuredAgencies, savedProperties }) => {
  const [loading, setLoading] = useState(true);
  const setProperties = useSetRecoilState(propertiesState);

  useEffect(() => {
    setProperties(properties => ({
      ...properties,
      featuredProperties: featuredProperties,
      savedProperties: savedProperties,
    }));
    setLoading(false)
    }, [savedProperties, featuredProperties, setProperties])

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

export { getServerSideProps };