// import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
// import { FaBed, FaBath } from "react-icons/fa";
// import { BsGridFill } from "react-icons/bs";
// import { GoVerified } from "react-icons/go";
// import millify from "millify";
// import DefaultImage from "../../public/house.jpg";
// import { baseUrl, fetchApi } from "../../utils/fetchApi";
// import ImageScrollbar from "../../components/ImageScrollbar";
// import Layout from "../../components/layout";

// export default function PropertyDetails({
//   propertyDetails: {
//     price,
//     rentFrequency,
//     rooms,
//     title,
//     baths,
//     area,
//     agency,
//     isVerified,
//     description,
//     type,
//     purpose,
//     furnishingStatus,
//     amenities,
//     photos,
//   },
// }: any) {
//   return (
//     <Layout title="Property details">
// <<<<<<< HEAD
//       {/* <Box maxWidth="1000px" margin="auto" p="4">
//         {photos && <ImageScrollbar data={photos} />}
// =======
//       <Box maxWidth="1000px" margin="auto" p="4">
//         {/* {photos && <ImageScrollbar data={photos} />} */}
// >>>>>>> f82dad50870dba828ac9c65b0bf15be08a7f5003

//         <Box w="full" p="6">
//           <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
//             <Flex alignItems="center">
//               <Box paddingRight="3" color="green.400">
//                 {isVerified && <GoVerified />}
//               </Box>
//               <Text fontWeight="bold" fontSize="lg">
//                 AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
//               </Text>
//             </Flex>
//             <Box>
//               <Avatar size="sm" src={agency?.logo?.url} />
//             </Box>
//           </Flex>
//           <Flex
//             alignItems="center"
//             p="1"
//             justifyContent="space-between"
//             w="250px"
//             color="blue.400"
//           >
//             {rooms}
//             <FaBed /> | {baths}
//             <FaBath /> | {millify(area)} sqft
//             <BsGridFill />
//           </Flex>

//           <Box marginTop="2">
//             <Text fontSize="lg" marginBottom="2" fontWeight="bold">
//               {title}
//             </Text>

//             <Text lineHeight="2" color="gray.600">
//               {description}
//             </Text>
//           </Box>

//           <Flex
//             flexWrap="wrap"
//             textTransform="uppercase"
//             justifyContent="space-between"
//           >
//             <Flex
//               justifyContent="space-between"
//               w="400px"
//               borderb="1px"
//               borderc="gray.100"
//               padding="3"
//             >
//               <Text>Type</Text>
//               <Text fontWeight="bold">{type}</Text>
//             </Flex>

//             <Flex
//               justifyContent="space-between"
//               w="400px"
//               borderb="1px"
//               borderc="gray.100"
//               padding="3"
//             >
//               <Text>Purpose</Text>
//               <Text fontWeight="bold">{purpose}</Text>
//             </Flex>
//             {furnishingStatus && (
//               <Flex
//                 justifyContent="space-between"
//                 w="400px"
//                 borderb="1px"
//                 borderc="gray.100"
//                 padding="3"
//               >
//                 <Text>Furnishing</Text>
//                 <Text fontWeight="bold">{furnishingStatus}</Text>
//               </Flex>
//             )}
//           </Flex>
//           <Box>
//             {amenities.length && (
//               <Text fontSize="2xl" fontWeight="lg" marginTop="5">
//                 Amenities
//               </Text>
//             )}
//             <Flex flexWrap="wrap">
//               {amenities.map((item) =>
//                 item.amenities.map((amenity) => (
//                   <Text
//                     key={amenity.text}
//                     fontWeight="bold"
//                     color="blue.400"
//                     fontSize="13"
//                     p='2'
//                     bg='gray.200'
//                     margin='1'
//                     borderRadius='5'
//                   >
//                     {amenity.text}
//                   </Text>
//                 ))
//               )}
//             </Flex>
//           </Box>
//         </Box>
//       </Box> */}
//     </Layout>
//   );
// }



import React from 'react'
import { Layout, Details, Contact, SimilarProperties } from '../../components'
import { UniquePropertyPageProps, SimilarPropertiesProps } from '../../types';
import { baseUrl, fetchApi } from '../../utils/fetchApi';

const Id: React.FC<UniquePropertyPageProps & SimilarPropertiesProps> = ({propertyDetails, similarProperties}) => {
  const {title} = propertyDetails;
  console.log(propertyDetails)
  return (
    <Layout title={title}>
      <div className='grid grid-cols-1 xll:grid-cols-3 gap-x-5 gap-y-10 pb-5'>
        <Details propertyDetails={propertyDetails} />
        <Contact propertyDetails={propertyDetails} />
        <SimilarProperties similarProperties={similarProperties} />
      </div>
    </Layout>
  )
}

export default Id;

export async function getServerSideProps({ params: { id } }: any) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  const similarProperties =  await fetchApi(`${baseUrl}/properties/list?hitsPerPage=4&locationExternalIDs=${data.location[1].externalID}&purpose=${data.purpose}&categoryExternalID=${data.category[1].externalID}&rentFrequency=${data.rentFrequency}&furnishingStatus=${data.furnishingStatus}`);

  return {
    props: {
      propertyDetails: data,
      similarProperties: similarProperties?.hits,
    },
  };
}