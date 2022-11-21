import React from 'react'
import { Layout, SearchFilters, Properties, Pagination } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { FindPropertyPageProps } from '../types';
import { GetServerSideProps } from 'next';
import { useRecoilState } from 'recoil';
import { loadingState } from '../states';
import Router from "next/router";

const FindProperty: React.FC<FindPropertyPageProps> = ({ properties, nbHits }) => {
  const [loading, setLoading] = useRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

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
  const page = query.page || "";

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