import SectionLayout from '../sectionLayout';
import image from '../../../public/assets/forRent.webp';

const ForRent = () => {
  return (
    <div>
        <SectionLayout 
            heading="RENT A HOME"
            paragraph="Explore Apartments, Villas, Homes and more."
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