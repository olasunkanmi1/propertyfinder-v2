import React, {useRef, useEffect, useState} from 'react'
import { Layout, SearchFilters, Properties, Pagination } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { FindPropertyPageProps } from '../types';
import { GetServerSideProps } from 'next';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, loadingState, searchFiltersState, addressSuggestionsAtom, propertiesState } from '../states';
import Router, { useRouter } from "next/router";
import axios from 'axios';

const FindProperty: React.FC<FindPropertyPageProps> = ({ properties, nbHits, savedProperties }) => {
  const filterRef = useRef<HTMLDivElement | null>(null)
  const suggestionsRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter();

  const [loading, setLoading] = useRecoilState(loadingState);
  const resetDropdown = useResetRecoilState(searchFiltersState);
  const [filter, setFilter] = useRecoilState(filterAtom);
  const setSuggestions = useSetRecoilState(addressSuggestionsAtom);
  const [prpts, setProperties] = useRecoilState(propertiesState);
  const [pageLoading, setPageLoading] = useState(true);

  // Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  // Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

  useEffect(() => {
    setFilter(filter => ({ 
      ...filter, 
      purpose: router.query.purpose ? router.query.purpose : 'for-rent',
      rentFrequency: router.query.rentFrequency ? router.query.rentFrequency : 'any',
      roomsMin: router.query.roomsMin ? router.query.roomsMin : '0',
      roomsMax: router.query.roomsMax ? router.query.roomsMax : 'any',
      bathsMin: router.query.bathsMin ? router.query.bathsMin : '0',
      bathsMax: router.query.bathsMax ? router.query.bathsMax : 'any',
      priceMin: router.query.priceMin ? router.query.priceMin : '0',
      priceMax: router.query.priceMax ? router.query.priceMax : 'any',
      areaMin: router.query.areaMin ? router.query.areaMin : '0',
      areaMax: router.query.areaMax ? router.query.areaMax : 'any',
      sort: router.query.sort ? router.query.sort : 'popular',
      furnishingStatus: router.query.furnishingStatus ? router.query.furnishingStatus : 'any',
      categoryExternalID: router.query.categoryExternalID ? router.query.categoryExternalID : '1',
      locationExternalIDs: router.query.locationExternalIDs ? router.query.locationExternalIDs : '5001',
      
      propertyType: router.query.categoryExternalID ? filter.propertyType : 'Property Type',
      emirates: router.query.locationExternalIDs ? filter.emirates : 'Emirates',
      sortBy: router.query.sort ? filter.sortBy : 'Sort',
    }))

    setProperties(prpts => ({
      ...prpts,
      properties: properties,
      savedProperties: savedProperties
    }));

    setPageLoading(false);

    const closeDropdown = (e: any) => {
      if(filterRef.current && !filterRef.current.contains(e.target)) {
        resetDropdown();
      }
      
      if(suggestionsRef.current && !suggestionsRef.current.contains(e.target) && window.innerWidth >= 768) {
        setSuggestions(suggestions => ({
          ...suggestions,
          predictions: null
        })) 
      }
    }
    document.addEventListener('click', closeDropdown, true);
    return () => document.removeEventListener('click', closeDropdown, true)
  }, [ resetDropdown, setSuggestions, router.query.purpose, router.query.rentFrequency, router.query.furnishingStatus, router.query.roomsMin, router.query.roomsMax, router.query.bathsMin, router.query.bathsMax, router.query.priceMin, router.query.priceMax, router.query.areaMin, router.query.areaMax, router.query.propertyType, router.query.categoryExternalID, router.query.locationExternalIDs, router.query.sort, setFilter, properties, setProperties, savedProperties])

  return (
    <Layout title="Find Property">
        <SearchFilters filterRef={filterRef} suggestionsRef={suggestionsRef} /> 
        <Properties pageLoading={pageLoading} />
        <> { prpts.properties && prpts.properties.length >= 1 && !loading.propertiesLoading && !pageLoading && <Pagination pageCount={nbHits} /> } </>
    </Layout> 
  )
}

export default FindProperty

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
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
  const categoryExternalID = query.categoryExternalID || "1"; 
  const locationExternalIDs = query.locationExternalIDs || "5001"; //5001 all UAE
  const page = query.page || "1";

  const data = await fetchApi( 
    `${baseUrl}/properties/list?hitsPerPage=12&locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&bathsMax=${bathsMax}&rentFrequency=${rentFrequency}&priceMin=${priceMin}&priceMax=${priceMax}&roomsMin=${roomsMin}&roomsMax=${roomsMax}&sort=${sort}&areaMin=${areaMin}&areaMax=${areaMax}&furnishingStatus=${furnishingStatus}&page=${page}`
  );

  let savedProperties;

  const cookieHeader = req.headers.cookie
  const config = {
    withCredentials: true,
    headers: cookieHeader ? {
      Cookie: cookieHeader
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
      properties: data?.hits,
      nbHits: data?.nbHits,
      savedProperties
    },
  };
} 