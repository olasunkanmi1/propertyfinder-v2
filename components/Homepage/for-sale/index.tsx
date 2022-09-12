import SectionLayout from '../sectionLayout';
import image from '../../../public/assets/forSale.webp';

const ForSale = () => {
  return (
    <div>
        <SectionLayout 
            heading="Buy a property"
            paragraph="Find, Buy & Own Your Dream Home."
            buttonText="Explore Buying"
            route="/find-property?purpose=for-sale"
            image={image}
            noIcon
        />
    </div>
  )    
}

export default ForSale