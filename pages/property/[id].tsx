import {memo} from 'react'
import { Layout, Details, Contact, SimilarProperties, NoProperty } from '@components'
import { UniquePropertyPageProps, SimilarPropertiesProps } from '@types';
import { uniquePropertyGSSP } from '@utils';

const Id: React.FC<UniquePropertyPageProps & SimilarPropertiesProps> = memo(({propertyDetails, similarProperties}) => {
  const {title} = propertyDetails;

  return (
    <>
      { Object.keys(propertyDetails).length !== 0 ? (
        <Layout title={title}>
            <div className='xll:flex justify-between space-y-8 xll:space-x-8 xll:space-y-0 pb-5'>
              <Details propertyDetails={propertyDetails} />

              <div className='space-y-8 xll:min-w-[352px]'>
                <Contact propertyDetails={propertyDetails} />
                <SimilarProperties similarProperties={similarProperties} />
              </div>
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

export const getServerSideProps = uniquePropertyGSSP;