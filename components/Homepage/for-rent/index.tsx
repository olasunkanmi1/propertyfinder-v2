import SectionLayout from '../sectionLayout';
import {forRent} from '@public';

const ForRent = () => {
  return (
    <SectionLayout 
        heading="RENT A PROPERTY"
        paragraph="Explore properties available for rent"
        text="Explore Our Extensive Listings of Properties for Rent, from Cozy Apartments to Other Properties in any location of your choice in the UAE."
        buttonText="Explore Renting"
        route="/find-property?purpose=for-rent"
        image={forRent}
        reverse
        noIcon
    />
  )    
}

export default ForRent