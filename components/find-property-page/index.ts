import dynamic from 'next/dynamic'

export const SearchFilters = dynamic(() => import('./search-filters'));
export const Properties = dynamic(() => import('./properties'));
export const Pagination = dynamic(() => import('./pagination'));