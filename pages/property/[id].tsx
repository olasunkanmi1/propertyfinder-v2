import {memo, useEffect} from 'react'
import { useSetRecoilState } from 'recoil'
import { Layout, Details, Contact, SimilarProperties, NoProperty } from '@components'
import { UniquePropertyPageProps, SimilarPropertiesProps } from '@types';
import { uniquePropertyGSSP } from '@utils';
import { propertiesState } from '@states'

const Id: React.FC<UniquePropertyPageProps & SimilarPropertiesProps> = memo(({propertyDetails, similarProperties}) => {
  const setPty = useSetRecoilState(propertiesState);
  const {title} = propertyDetails;

  useEffect(() => {
    setPty(pty => ({
      ...pty,
      isList: false
  }))
  }, [setPty])

  return (
    <>
      { Object.keys(propertyDetails).length !== 0 ? (
        <Layout title={title}>
            <div className='lg:flex justify-between space-y-8 lg:space-x-8 lg:space-y-0 pb-5 lg:wrapper'>
              <Details propertyDetails={propertyDetails} />

              <div className='space-y-8 lg:min-w-[352px]'>
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