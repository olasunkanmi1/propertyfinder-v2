import React from 'react'
import router from "next/router";
import EmiratesAndFilterIcon from './emirates-and-filterIcon'
import FurnishingStatusAndSort from './furnishingStatus-and-sort'
import Searchbox from './searchbox'
import { getFilterValues } from '../../../../utils/filterData';


export const findProperties = (filterValues: any) => {
  const path = router.pathname;
  const { query } = router;

  const values = getFilterValues(filterValues);

  values.forEach((item) => {
    if (item.value && filterValues?.[item.name]) { //allow url to only show selected query. not all.
      query[item.name] = item.value;
    }
  });

  router.push({ pathname: path, query }); //pathname:path, query:query
};

const MobileFilters = () => {
  return (
    <div className='flex flex-col md:hidden space-y-4'>
        <Searchbox />
        <EmiratesAndFilterIcon />
        <FurnishingStatusAndSort />
    </div>
  )
}

export default MobileFilters