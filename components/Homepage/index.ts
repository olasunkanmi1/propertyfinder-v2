import dynamic from 'next/dynamic'

export const FindHome = dynamic(() => import('./find-home'));
export const FeaturedProperties = dynamic(() => import('./featured-properties'));
export const ForRent = dynamic(() => import('./for-rent'));
export const ForSale = dynamic(() => import('./for-sale'));
export const FeaturedAgencies = dynamic(() => import('./featured-agencies'));