import Image from 'next/image'
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import {homeNotFound} from "@public";
import { loadingState, propertiesState, filterAtom } from '@states';
import {CardSkeleton, Heading, Property} from '@components';

const Properties = () => {
  const loading = useRecoilValue(loadingState);
  const properties = useRecoilValue(propertiesState);
  const filter = useRecoilValue(filterAtom);
  const router = useRouter();

  const {propertyType, emirates, address} = filter;
  const {query} = router;

  const typeFormat = properties.properties && properties.properties.length > 1 ? (propertyType.endsWith('y') ? propertyType.slice(0, -1) + 'ies' : propertyType + 's') : propertyType
  const type = propertyType === 'Property Type' ? (properties.properties?.length! > 1 ? 'Properties' : 'Property') : typeFormat
  const purpose = !query.purpose || query.purpose === 'for-rent' ? 'for rent' : query.purpose === 'for-sale' ? 'for sale' : ''
  const location = emirates === 'any' && !address ? '' : address ? `in ${address}` : `in ${emirates}`

  return (
    <div className='space-y-4'>
      <Heading heading={`${loading.propertiesLoading ? 'Loading properties...' : properties.properties?.length === 0 ? 'No property found' : `${type} available ${purpose} ${location}`}`} 
        forProperty={properties.properties?.length === 0 ? false : true}
        ptsPage 
      /> 

      { properties.properties?.length === 0 && !loading.propertiesLoading ? (
        <>
          <span className='flex justify-center text-lg font-bold '> Try other filtering options </span>
          <div className='mb-4 relative w-full h-[300px] md:w-[400px] md:h-[400px] mx-auto'>
             <Image src={homeNotFound} alt="no result" priority fill />
          </div>
        </>
      ) : (
      <div className={`grid grid-cols-1 gap-y-6 gap-x-4 ${properties.isList ? 'listLayout md:grid-cols-2' : 'gridLayout sm:grid-cols-3 lg:grid-cols-4'}`}>
        { loading.propertiesLoading ? (
          [...Array(6)].map((arr, index) => <CardSkeleton key={index} />)
        ) : (
          <>
            {properties.properties?.map((property) => {
                return (
                  <Property key={property.externalID} property={property} />
                )
            })}
          </>
        )}        
      </div>
      )} 
    </div>
  )
}

export default Properties