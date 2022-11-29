import React from 'react'
import router from "next/router";
import DesktopAndTabs from './desktopAndTabs'
import MobileFilters from './mobile'
import { getFilterValues } from '../../../utils/filterData';

export const findProperties = (filterValues: any) => {
  const path = router.pathname;
  const { query } = router;

  const values = getFilterValues(filterValues);

  values.forEach((item) => {
    if (item.value && filterValues?.[item.name]) { //allow url to only show selected query. not all.
      if(item.value !== 'any') {
        query[item.name] = item.value;
      } else {
        query[item.name] = [];
      }
    }
  });

  router.push({ pathname: path, query }); //pathname:path, query:query
};

const SearchFilters = () => {
  return (
    <div>
        <DesktopAndTabs />
        <MobileFilters />
    </div>
  )
}

export default SearchFilters