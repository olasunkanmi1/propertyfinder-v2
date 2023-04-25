import {memo} from 'react'
import { Layout, Details, Contact, SimilarProperties, NoProperty } from '../../components'
import { UniquePropertyPageProps, SimilarPropertiesProps } from '../../types';
import { getServerSideProps } from '../../utils/getServerSideFns/propertyId';

const Id: React.FC<UniquePropertyPageProps & SimilarPropertiesProps> = memo(({propertyDetails, similarProperties}) => {
  const {title} = propertyDetails;

  return (
    <>
      { Object.keys(propertyDetails).length !== 0 ? (
        <Layout title={title}>
            <div className='grid grid-cols-1 xll:grid-cols-3 gap-x-5 gap-y-10 pb-5'>
              <Details propertyDetails={propertyDetails} />
              <Contact propertyDetails={propertyDetails} />
              <SimilarProperties similarProperties={similarProperties} />
            </div>
        </Layout>
      ) : (
          <NoProperty />
      ) }
    </>
  )
})

Id.displayName = 'Id';
export default Id;

export { getServerSideProps }