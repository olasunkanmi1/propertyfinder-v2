import { GetServerSideProps } from "next";
import { bayutFetchFn } from "../bayutFetchFn";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id
    const data = await bayutFetchFn({url: `properties/detail?externalID=${id}`});
    const similarProperties = Object.keys(data).length !== 0 ? await bayutFetchFn({url: `properties/list?hitsPerPage=4&locationExternalIDs=${data.location[1].externalID}&purpose=${data.purpose}&categoryExternalID=${data.category[1].externalID}&rentFrequency=${data.rentFrequency}&furnishingStatus=${data.furnishingStatus}`}) : [];
  
    return {
      props: {
        propertyDetails: data,
        similarProperties: similarProperties?.hits ? similarProperties?.hits : [],
      },
    };
}