import React from 'react';
import { Layout, FindHome, FeaturedProperties, ForRent, ForSale, FeaturedAgencies } from "../components";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { HomepageProps } from '../types';

const Home: React.FC<HomepageProps> = ({ featuredProperties, featuredAgencies }) => {
  return (
    <Layout title="Find your dream property">
      <>
        <FindHome />
        <FeaturedProperties featuredProperties={featuredProperties} />
        <ForRent />
        <ForSale />
        <FeaturedAgencies featuredAgencies={featuredAgencies} />
      </>
    </Layout>
  )
}

export default Home

// export default function Home({ propertiesForSale, propertiesForRent }) {
//   // console.log(propertiesForSale, propertiesForRent)
//   return (
//     <Layout>
//       <>
        
//       {/* <Banner
//         purpose="RENT A HOME"
//         title1="Rental Homes for"
//         title2="Everyone"
//         desc1="Explore Apartments, Villas, Homes"
//         desc2="and more"
//         buttonText="Explore Renting"
//         linkName="/search?purpose=for-rent"
//         imageUrl="https://media.istockphoto.com/photos/suburban-house-picture-id1269776313?b=1&k=20&m=1269776313&s=170667a&w=0&h=l51twHk4nPDByOemkf31YY4tRcKxLx3CGfS2K3ktWx0="
//       /> */}

//       {/* <Flex flexWrap="wrap">
//         { propertiesForRent.map((property) => <Property property={property} key={property.id} />) }
//       </Flex> */}

//       {/* <Banner
//         purpose="BUY A HOME"
//         title1="Find, Buy & Own Your"
//         title2="Dream Home"
//         desc1="Explore Apartments, Villas, Homes"
//         desc2="and more"
//         buttonText="Explore Buying"
//         linkName="/search?purpose=for-sale"
//         imageUrl="https://media.istockphoto.com/photos/home-with-blue-siding-and-stone-faade-on-base-of-home-picture-id1272128530?b=1&k=20&m=1272128530&s=170667a&w=0&h=k9lT5-DEmkmehDb-EKRHoP1-op2DTgz4ibiWGXmj7h8="
//       /> */}

//       {/* <Flex flexWrap="wrap">
//         { propertiesForSale.map((property) => <Property property={property} key={property.id} />) }
//       </Flex> */}
//       </>
//     </Layout>
//   );
// }

export async function getStaticProps() {
  // const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  // const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  const featuredProperties = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&hitsPerPage=6`)
  const agencies = await fetchApi(`${baseUrl}/agencies/list?query=.&hitsPerPage=25`)

  return {
    props: {
      // propertiesForSale: propertyForSale?.hits,
      // propertiesForRent: propertyForRent?.hits,
      featuredProperties: featuredProperties?.hits,
      featuredAgencies: agencies?.hits,
    }
  }
}
