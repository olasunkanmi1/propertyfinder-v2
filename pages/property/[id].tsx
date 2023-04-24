import { Layout, Details, Contact, SimilarProperties, NoProperty } from '../../components'
import { UniquePropertyPageProps, SimilarPropertiesProps, Property } from '../../types';
import Router from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../states';
import { getServerSideProps } from '../../utils/getServerSideFns/propertyId';

const Id: React.FC<UniquePropertyPageProps & SimilarPropertiesProps> = ({propertyDetails, similarProperties}) => {
  const setLoading = useSetRecoilState(loadingState);

  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading(loading => ({...loading, propertiesLoading: false, routeChangeLoading: false})) );

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
}

export default Id;

export { getServerSideProps }