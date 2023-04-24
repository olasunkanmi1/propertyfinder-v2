import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const {token, email} = query
    let isVerified;
  
    const obj = {
      verificationToken: token,
      email,
    }
    
    const config = {
      withCredentials: true,
      headers: req.headers.cookie ? {
        Cookie: req.headers.cookie
      } : {
        Cookie: ''
      }
    };
  
    try {
      const {data} = await axios.post('/verify-email', obj, config);
      if(data) isVerified = true
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
      },
    };
};