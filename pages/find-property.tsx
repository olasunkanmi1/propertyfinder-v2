import {useRef, useEffect, memo} from 'react'
import { useRouter } from "next/router";
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Layout, SearchFilters, Properties, Pagination } from "@components";
import { FindPropertyPageProps } from '@types';
import { filterAtom, loadingState, searchFiltersState, addressSuggestionsAtom, propertiesState } from '@states';
import { findPropertyGSSP, setFilterState } from '@utils';

const FindProperty: React.FC<FindPropertyPageProps> = memo(({ properties, nbHits, savedProperties }) => {
  const filterRef = useRef<HTMLDivElement | null>(null)
  const suggestionsRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter();

  const setLoading = useSetRecoilState(loadingState);
  const resetDropdown = useResetRecoilState(searchFiltersState);
  const setFilter = useSetRecoilState(filterAtom);
  const setSuggestions = useSetRecoilState(addressSuggestionsAtom);
  const setProperties = useSetRecoilState(propertiesState);

  useEffect(() => {
    setFilterState(setFilter, router);
    setProperties(prpts => ({
      ...prpts,
      properties: properties,
      savedProperties: savedProperties
    }));

    setLoading(loading => ({...loading, propertiesLoading: false}))

    // close suggestions dropdown when any part of the page is clicked
    const closeDropdown = (e: any) => {
      if(filterRef.current && !filterRef.current.contains(e.target)) {
        resetDropdown();
      }
      
      if(suggestionsRef.current && !suggestionsRef.current.contains(e.target) && window.innerWidth >= 768) {
        setSuggestions(null) 
      }
    }
    document.addEventListener('click', closeDropdown, true);
    return () => document.removeEventListener('click', closeDropdown, true)
  }, [ router, resetDropdown, setSuggestions, setFilter, properties, setProperties, savedProperties, setLoading])

  return (
    <Layout title="Find Property">
      <SearchFilters filterRef={filterRef} suggestionsRef={suggestionsRef} /> 
      
      <div className="pb-10 space-y-10 wrapper">
        <Properties />
        <Pagination pageCount={nbHits} />
      </div>
    </Layout> 
  )
})

FindProperty.displayName = 'FindProperty';
export default FindProperty

export const getServerSideProps = findPropertyGSSP;