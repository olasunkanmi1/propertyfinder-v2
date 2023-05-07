import { GetServerSideProps } from "next";
import axiosInstance from "../axiosInstance";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  let user = null;
  let savedProperties = null;
  
  const cookieHeader = req.headers.cookie    
  const config = {
    headers: cookieHeader ? {
      Cookie: cookieHeader
    } : {
      Cookie: ''
    }
  };

  try {
    const { data } = await axiosInstance.get(`${process.env.BACKEND_URL}/user`, config);
    user = data;

    const { data: propertyData } = await axiosInstance.get(`${process.env.BACKEND_URL}/property`, config);
    savedProperties = propertyData.savedProperties;
  } catch (error) {
    console.log(error)
  }

  if(!user) {
    return {
        redirect: {
          permanent: false,
          destination: '/',
        },
    }
  }
    
  return {
    props: {
      savedProperties: savedProperties.reverse(),
    },
  };
};