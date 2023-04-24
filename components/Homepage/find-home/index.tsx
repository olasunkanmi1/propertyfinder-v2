import dynamic from 'next/dynamic'

const SectionLayout  = dynamic(() => import('../sectionLayout'));
import image from '../../../public/assets/findHome.webp'

const FindHome = () => {
  return (
    <SectionLayout
        heading="FIND YOUR DREAM PROPERTY"
        paragraph="Let's help you find your perfect property anywhere in the UAE."
        text="Find Your Ideal Property Among Our Wide Selection of Listings. Find Your Next Place to Call Home with Us."
        buttonText="Start searching"
        route="/find-property"
        image={image}
        firstImg
    />
  )
}

export default FindHome