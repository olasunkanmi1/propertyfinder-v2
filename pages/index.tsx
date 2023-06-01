import {useEffect, memo} from 'react';
import { Layout, FindHome, FeaturedProperties, ForRent, ForSale, FeaturedAgencies } from "@components";
import { useSetRecoilState } from 'recoil';
import { HomepageProps } from '@types';
import { propertiesState } from '@states';
import { homepageGSSP } from '@utils'

const Home: React.FC<HomepageProps> = memo(({ featuredProperties, featuredAgencies, savedProperties }) => {
  const setProperties = useSetRecoilState(propertiesState);

  useEffect(() => {
    setProperties(properties => ({
      ...properties,
      featuredProperties: featuredProperties,
      savedProperties: savedProperties,
    }));
  }, [savedProperties, featuredProperties, setProperties])

  return (
      <Layout title="Find your dream property">
        <div className="wrapper space-y-10">
          <FindHome />
          <FeaturedProperties />
          <ForRent />
          <ForSale />
          <FeaturedAgencies featuredAgencies={featuredAgencies} />
        </div>
      </Layout>
  )
})

Home.displayName = 'Home';
export default Home

export const getServerSideProps = homepageGSSP;