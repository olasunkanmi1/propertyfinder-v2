import React from 'react'
import { Layout, SearchFilters, Properties, Pagination } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { FindPropertyPageProps } from '../types';
import { GetServerSideProps } from 'next';

const FindProperty: React.FC<FindPropertyPageProps> = ({ properties }) => {
  return (
    <Layout title="Find Property">
        <SearchFilters />
        <Properties properties={properties} />
        <Pagination />
    </Layout>
  )
}

export default FindProperty

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const sort = query.sort || "price-desc";
  const areaMin = query.areaMin || "0";
  const areaMax = query.areaMax || "35000";
  const roomsMin = query.roomsMin || "0";
  const roomsMax = query.roomsMax || "10";
  const bathsMin = query.bathsMin || "0";
  const bathsMax = query.bathsMax || "10";
  const furnishingStatus = query.furnishingStatus || "furnished";
  const categoryExternalID = query.categoryExternalIDs || "1"; //0 for residential
  const locationExternalIDs = query.locationExternalIDs || "5001"; //5001 all UAE
  const page = query.page || "0"; 

  const data = await fetchApi(
    `${baseUrl}/properties/list?hitsPerPage=10&page=${page}&locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}