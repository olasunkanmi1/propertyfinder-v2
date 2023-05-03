import { GetServerSideProps } from "next";
import { baseUrl, fetchApi } from "../fetchApi";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const featuredProperties = await fetchApi({url: `${baseUrl}/properties/list?locationExternalIDs=5001`, superhotProperties: true});
  const featuredAgencies = await fetchApi({url: `${baseUrl}/agencies/list?query=i`, featuredAgencies: true});

  let savedProperties;
  const config = {
    withCredentials: true,
    headers: req.headers.cookie ? {
      Cookie: req.headers.cookie
    } : {
      Cookie: ''
    }
  };

  try {
    const {data} = await axios.get(`${process.env.BACKEND_URL}/property`, config)
    savedProperties = await data.savedProperties
  } catch (error) {
    savedProperties = null
  }

  return {
    props: {
      featuredProperties,
      featuredAgencies,
      savedProperties
    },
  };
}