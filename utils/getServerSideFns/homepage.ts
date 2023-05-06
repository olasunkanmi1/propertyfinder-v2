import { GetServerSideProps } from "next";
import { bayutFetchFn } from "../bayutFetchFn";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const featuredProperties = await bayutFetchFn({url: 'properties/list?locationExternalIDs=5001', superhotProperties: true});
  const featuredAgencies = await bayutFetchFn({url: 'agencies/list?query=i', featuredAgencies: true});

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