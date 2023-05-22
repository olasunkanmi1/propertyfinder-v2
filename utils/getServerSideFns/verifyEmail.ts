import { GetServerSideProps } from "next";
import axiosInstance from "../axiosInstance";

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const {token, email} = query
    let isVerified;
    let samePersonLoggedIn = false;
  
    const obj = {
      verificationToken: token,
      email,
    }
    
    const config = {
      headers: req.headers.cookie ? {
        Cookie: req.headers.cookie
      } : {
        Cookie: ''
      }
    };
  
    try {
      const {data} = await axiosInstance.post(`${process.env.BACKEND_URL}/auth/verify-email`, obj, config);
      if(data) {
        isVerified = true;
        samePersonLoggedIn = data.samePersonLoggedIn
      } 
    } catch (error) {
      isVerified = false
    }
  
    if(!token || !email) {
      return {
          redirect: {
            permanent: false,
            destination: '/',
          },
      }
    }
      
    return {
      props: {
        isVerified,
        samePersonLoggedIn
      },
    };
};