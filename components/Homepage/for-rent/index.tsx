import SectionLayout from '../sectionLayout';
import image from '../../../public/assets/forRent.webp';

const ForRent = () => {
  return (
    <div>
        <SectionLayout 
            heading="RENT A PROPERTY"
            paragraph="Explore properties available for rent"
            text="Explore Our Extensive Listings of Properties for Rent, from Cozy Apartments to Other Properties in any location of your choice in the UAE."
            buttonText="Explore Renting"
            route="/find-property?purpose=for-rent"
            image={image}
            reverse
            noIcon
        />
    </div>
  )    
}

export default ForRent