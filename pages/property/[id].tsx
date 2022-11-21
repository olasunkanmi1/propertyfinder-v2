import React from 'react'
import { Layout, Details, Contact, SimilarProperties } from '../../components'
import { UniquePropertyPageProps, SimilarPropertiesProps } from '../../types';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import Router from "next/router";
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../../states';

const Id: React.FC<UniquePropertyPageProps & SimilarPropertiesProps> = ({propertyDetails, similarProperties}) => {
  const setLoading = useSetRecoilState(loadingState);
  Router.events.on("routeChangeStart", () => setLoading(loading => ({...loading, routeChangeLoading: true})) );
  Router.events.on("routeChangeComplete", () => setLoading({propertiesLoading: false, routeChangeLoading: false}) );

  const {title} = propertyDetails;
  console.log(propertyDetails)
  return (
    <Layout title={title}>
      <div className='grid grid-cols-1 xll:grid-cols-3 gap-x-5 gap-y-10 pb-5'>
        <Details propertyDetails={propertyDetails} />
        <Contact propertyDetails={propertyDetails} />
        <SimilarProperties similarProperties={similarProperties} />
      </div>
    </Layout>
  )
}

export default Id;

export async function getServerSideProps({ params: { id } }: any) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  const similarProperties =  await fetchApi(`${baseUrl}/properties/list?hitsPerPage=4&locationExternalIDs=${data.location[1].externalID}&purpose=${data.purpose}&categoryExternalID=${data.category[1].externalID}&rentFrequency=${data.rentFrequency}&furnishingStatus=${data.furnishingStatus}`);

  return {
    props: {
      propertyDetails: data,
      similarProperties: similarProperties?.hits,
    },
  };
}