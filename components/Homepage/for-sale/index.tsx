import SectionLayout from '../sectionLayout';
import {forSale} from '@public';

const ForSale = () => {
  return (
    <SectionLayout 
        heading="BUY A PROPERTY"
        paragraph="Find, buy and own your dream property."
        text="Explore Our Inventory of Homes That are Updated Daily So You Can Be Sure You're Seeing the Best Properties on The Market."
        buttonText="Explore Buying"
        route="/find-property?purpose=for-sale"
        image={forSale}
        noIcon
    />
  )    
}

export default ForSale