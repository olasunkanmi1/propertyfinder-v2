import { GetServerSideProps } from "next";
import { bayutFetchFn } from "../bayutFetchFn";
import axiosInstance from "../axiosInstance";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const purpose = query.purpose || "for-rent";
    const rentFrequency = query.rentFrequency || "yearly";
    const priceMin = query.priceMin || "0";
    const priceMax = query.priceMax || "1000000";
    const sort = query.sort || "";
    const areaMin = query.areaMin || "0";
    const areaMax = query.areaMax || "35000";
    const roomsMin = query.roomsMin || "0";
    const roomsMax = query.roomsMax || "10";
    const bathsMin = query.bathsMin || "0";
    const bathsMax = query.bathsMax || "10";
    const furnishingStatus = query.furnishingStatus || "";
    const categoryExternalID = query.categoryExternalID || "1"; 
    const locationExternalIDs = query.locationExternalIDs || "5001"; //5001 all UAE
    const page = query.page || "1";
  
    const data = await bayutFetchFn( 
      {url: `properties/list?hitsPerPage=12&locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&bathsMax=${bathsMax}&rentFrequency=${rentFrequency}&priceMin=${priceMin}&priceMax=${priceMax}&roomsMin=${roomsMin}&roomsMax=${roomsMax}&sort=${sort}&areaMin=${areaMin}&areaMax=${areaMax}&furnishingStatus=${furnishingStatus}&page=${page}`}
    );
  
    let savedProperties;
  
    const cookieHeader = req.headers.cookie
    const config = {
      headers: cookieHeader ? {
        Cookie: cookieHeader
      } : {
        Cookie: ''
      }
    };
  
    try {
      const {data} = await axiosInstance.get(`${process.env.BACKEND_URL}/property`, config)
      savedProperties = await data.savedProperties
    } catch (error) {
      savedProperties = null
    }
  
    return {
      props: {
        properties: data?.hits,
        nbHits: data?.nbHits,
        savedProperties
      },
    };
  } 