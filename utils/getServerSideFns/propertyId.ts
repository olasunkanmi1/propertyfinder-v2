import { GetServerSideProps } from "next";
import { baseUrl, fetchApi } from "../fetchApi";

export async function getServerSideProps({ params: { id } }: any) {
    const data = await fetchApi({url: `${baseUrl}/properties/detail?externalID=${id}`});
    const similarProperties = Object.keys(data).length !== 0 ? await fetchApi({url: `${baseUrl}/properties/list?hitsPerPage=4&locationExternalIDs=${data.location[1].externalID}&purpose=${data.purpose}&categoryExternalID=${data.category[1].externalID}&rentFrequency=${data.rentFrequency}&furnishingStatus=${data.furnishingStatus}`}) : [];
  
    return {
      props: {
        propertyDetails: data,
        similarProperties: similarProperties?.hits ? similarProperties?.hits : [],
      },
    };
}