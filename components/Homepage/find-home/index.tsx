import SectionLayout from '../sectionLayout'
import image from '../../../public/assets/findHome.webp'

const FindHome = () => {
  return (
    <SectionLayout
        heading="FIND YOUR DREAM PROPERTY"
        paragraph="Let's assist you in finding your preferred property anywhere in the UAE."
        buttonText="Start finding"
        route="/find-property"
        image={image}
    />
  )
}

export default FindHome