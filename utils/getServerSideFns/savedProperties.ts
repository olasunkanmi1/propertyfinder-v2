import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    let user;
    let savedProperties;
  
    const cookieHeader = req.headers.cookie
    
    const config = {
      withCredentials: true,
      headers: cookieHeader ? {
        Cookie: cookieHeader
      } : {
        Cookie: ''
      }
    };
  
    try {
      const {data} = await axios.get(`${process.env.BACKEND_URL}/user`, config)
      user = await data
    } catch (error) {
      user = null
    }
  
    try {
      const {data} = await axios.get(`${process.env.BACKEND_URL}/property`, config)
      savedProperties = await data.savedProperties
    } catch (error) {
      savedProperties = null
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