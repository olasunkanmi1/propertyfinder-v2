import dynamic from 'next/dynamic'

export const Layout = dynamic(() => import('./layout'));
export * from './Homepage';
export * from './find-property-page';
export * from './unique-property';
export {default as Property} from './property';