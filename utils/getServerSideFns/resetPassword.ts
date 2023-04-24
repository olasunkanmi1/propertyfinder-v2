import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const {token, email} = query
  
    if(!token || !email) {
      return {
          redirect: {
            permanent: false,
            destination: '/',
          },
      }
    }
      
    return {
      props: {},
    };
};