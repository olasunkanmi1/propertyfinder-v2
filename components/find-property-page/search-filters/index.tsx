import dynamic from 'next/dynamic'

const DesktopAndTabs = dynamic(() => import('./desktopAndTabs'));
const MobileFilters = dynamic(() => import('./mobile'));

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