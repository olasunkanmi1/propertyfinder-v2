import dynamic from 'next/dynamic'
import { ISearchFiltersProps } from '../../../types';

const DesktopAndTabs = dynamic(() => import('./desktopAndTabs'));
const MobileFilters = dynamic(() => import('./mobile'));

const SearchFilters: React.FC<ISearchFiltersProps> = ({filterRef, suggestionsRef}) => {
  return (
    <div>
        <DesktopAndTabs filterRef={filterRef} suggestionsRef={suggestionsRef} />
        <MobileFilters />
    </div>
  )
}

export default SearchFilters