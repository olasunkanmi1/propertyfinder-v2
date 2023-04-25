import {useRef, useEffect, useState, memo} from 'react'
import { Layout, SearchFilters, Properties, Pagination } from "../components";
import { FindPropertyPageProps } from '../types';
import { useRecoilState, useResetRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, loadingState, searchFiltersState, addressSuggestionsAtom, propertiesState } from '../states';
import { useRouter } from "next/router";
import { setFilters } from '../utils/findPopertyDefault';
import { getServerSideProps } from '../utils/getServerSideFns/findProperty';

const FindProperty: React.FC<FindPropertyPageProps> = memo(({ properties, nbHits, savedProperties }) => {
  const filterRef = useRef<HTMLDivElement | null>(null)
  const suggestionsRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter();

  const loading = useRecoilValue(loadingState);
  const resetDropdown = useResetRecoilState(searchFiltersState);
  const setFilter = useSetRecoilState(filterAtom);
  const setSuggestions = useSetRecoilState(addressSuggestionsAtom);
  const [prpts, setProperties] = useRecoilState(propertiesState);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setFilters(setFilter, router);
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
  }, [ resetDropdown, setSuggestions, router.query.purpose, router.query.rentFrequency, router.query.furnishingStatus, router.query.roomsMin, router.query.roomsMax, router.query.bathsMin, router.query.bathsMax, router.query.priceMin, router.query.priceMax, router.query.areaMin, router.query.areaMax, router.query.propertyType, router.query.categoryExternalID, router.query.locationExternalIDs, router.query.sort, setFilter, properties, setProperties, savedProperties, router])

  return (
    <Layout title="Find Property">
      <SearchFilters filterRef={filterRef} suggestionsRef={suggestionsRef} /> 
      <Properties pageLoading={pageLoading} />
      <> { prpts.properties && prpts.properties.length >= 1 && !loading.propertiesLoading && !pageLoading && <Pagination pageCount={nbHits} /> } </>
    </Layout> 
  )
})

FindProperty.displayName = 'FindProperty';
export default FindProperty

export { getServerSideProps }