import React from 'react'
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { Layout, SearchFilters, Property } from "../components";
import noResult from "../public/noresult.jpg";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { FindPropertyPageProps } from '../types';
import { GetServerSideProps } from 'next';

const FindProperty: React.FC<FindPropertyPageProps> = ({ properties }) => {
  console.log(properties)
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Layout title="Find Property">
      <>
        <SearchFilters />
        <div className='flex flex-wrap gap-x-5 gap-y-10 w-full justify-center'>
          {/* <Flex
            cursor="pointer"
            bg="gray.100"
            border="1px"
            borderColor="gray.200"
            p="2"
            fontWeight="black"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters(!searchFilters)}
          >
            <Text>Search Property By Filters</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter} />
          </Flex>

          {searchFilters && <SearchFilters />}

          <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {router.query.purpose}
          </Text> */}
          
          {/* <Flex flexWrap="wrap"> */}
            {properties.map((property) => {
              return (
                <Property key={property.externalID} property={property} />
              )
            })}
          {/* </Flex> */}

          {properties.length === 0 && (
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              marginTop="5"
              marginBottom="5"
            >
              <Image src={noResult} alt="no result" />
            </Flex>
          )}
        </div>
      </>
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

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
