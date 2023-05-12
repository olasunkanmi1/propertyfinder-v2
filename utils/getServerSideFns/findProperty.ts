import { GetServerSideProps } from "next";
import { bayutFetchFn } from "../bayutFetchFn";
import axiosInstance from "../axiosInstance";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const purpose = query.purpose || "for-rent";
    const rentFrequency = query.rentFrequency || "yearly";
    const priceMin = query.priceMin || "";
    const priceMax = query.priceMax || "";
    const sort = query.sort || "";
    const areaMin = query.areaMin || "";
    const areaMax = query.areaMax || "";
    const roomsMin = query.roomsMin || "";
    const roomsMax = query.roomsMax || "";
    const bathsMin = query.bathsMin || "";
    const bathsMax = query.bathsMax || "";
    const furnishingStatus = query.furnishingStatus || "";
    const categoryExternalID = query.categoryExternalID || "1"; 
    const locationExternalIDs = query.locationExternalIDs || "5001"; //5001 all UAE
    const page = query.page || "";
  
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