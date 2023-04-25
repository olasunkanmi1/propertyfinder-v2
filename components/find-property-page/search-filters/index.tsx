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

export interface ISearchFiltersProps {
  filterRef: React.MutableRefObject<HTMLDivElement | null>;
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>;
}

const SearchFilters: React.FC<ISearchFiltersProps> = ({filterRef, suggestionsRef}) => {
  return (
    <div>
        <DesktopAndTabs filterRef={filterRef} suggestionsRef={suggestionsRef} />
        <MobileFilters />
    </div>
  )
}

export default SearchFilters