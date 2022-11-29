import React, {useEffect} from 'react'
import { Layout, SearchFilters, Properties, Pagination } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { FindPropertyPageProps } from '../types';
import { GetServerSideProps } from 'next';
import { useRecoilState } from 'recoil';
import { filterAtom, loadingState } from '../states';
import Router, { useRouter } from "next/router";

const FindProperty: React.FC<FindPropertyPageProps> = ({ properties, nbHits }) => {
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(loadingState);
  const [filter, setFilter] = useRecoilState(filterAtom);
  // Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  // Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

  useEffect(() => {
    setFilter(filter => ({ 
      ...filter, 
      purpose: router.query.purpose ? router.query.purpose : 'for-rent',
      furnishingStatus: router.query.furnishingStatus ? router.query.furnishingStatus : 'any',
    }))
  }, [ router.query.purpose, router.query.furnishingStatus, setFilter])
  
 

  return (
    <Layout title="Find Property">
        <SearchFilters /> 
        <Properties properties={properties} />
        <> { properties.length >= 1 && !loading.propertiesLoading && <Pagination pageCount={nbHits} /> } </>
    </Layout> 
  )
}

export default FindProperty

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const priceMin = query.priceMin || "0";
  const priceMax = query.priceMax || "1000000";
  const sort = query.sort || "";
  const areaMin = query.areaMin || "0";
  const areaMax = query.areaMax || "35000";
  const roomsMin = query.roomsMin || "0";
  const roomsMax = query.roomsMax || "10";
  const bathsMin = query.bathsMin || "0";
  const bathsMax = query.bathsMax || "10";
  const furnishingStatus = query.furnishingStatus || "";
  const categoryExternalID = query.categoryExternalID || ""; 
  const locationExternalIDs = query.locationExternalIDs || "5001"; //5001 all UAE
  const page = query.page || "1";

  const data = await fetchApi( 
    `${baseUrl}/properties/list?hitsPerPage=12&locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&bathsMax=${bathsMax}&rentFrequency=${rentFrequency}&priceMin=${priceMin}&priceMax=${priceMax}&roomsMin=${roomsMin}&roomsMax=${roomsMax}&sort=${sort}&areaMin=${areaMin}&areaMax=${areaMax}&furnishingStatus=${furnishingStatus}&page=${page}`
  );

  return {
    props: {
      properties: data?.hits,
      nbHits: data?.nbHits
    },
  };
} 