import dynamic from 'next/dynamic'

export const Details = dynamic(() => import('./details'));
export const Contact = dynamic(() => import('./contact'));
export const SimilarProperties = dynamic(() => import('./similar-properties'));
export const NoProperty = dynamic(() => import('./no-property'));