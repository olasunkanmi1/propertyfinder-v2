import { GetServerSideProps } from "next";
import { baseUrl, fetchApi } from "../fetchApi";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const featuredProperties = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5001&hitsPerPage=6`);
  const featuredAgencies = await fetchApi(`${baseUrl}/agencies/list?query=a&hitsPerPage=4`, 'featuredAgencies');

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
      featuredProperties: featuredProperties?.hits,
      featuredAgencies,
      savedProperties
    },
  };
}