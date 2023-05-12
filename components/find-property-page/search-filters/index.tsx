import { ISearchFiltersProps } from '@types';
import DesktopAndTabs from './desktopAndTabs';
import MobileFilters from './mobile';

const SearchFilters: React.FC<ISearchFiltersProps> = ({filterRef, suggestionsRef}) => {
  return (
    <div>
        <DesktopAndTabs filterRef={filterRef} suggestionsRef={suggestionsRef} />
        <MobileFilters />
    </div>
  )
}

export default SearchFilters