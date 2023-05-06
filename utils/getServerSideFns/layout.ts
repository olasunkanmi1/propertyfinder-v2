import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  let user = null;
  
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
    const { data } = await axios.get(`${process.env.BACKEND_URL}/user`, config);
    user = data.user;
  } catch (error) {
    user = null
  }

  return {
    props: {
      user
    },
  };
};