import LayoutSwitch from "components/property/layout-switch"
import { HeadingProps } from "@types"

const Heading: React.FC<HeadingProps> = ({heading, forProperty, ptsPage}) => {
  return (
    <div className={`flex items-center space-x-3 ${forProperty ? 'justify-between' : 'justify-center'}`}>
      <h1 
        className={`text-xl ms:text-2xl text-primary font-semibold whitespace-normal
        ${ptsPage ? 'mx-auto text-center sfs:text-left sfs:mx-0' : ''}
        `}
      > 
        {heading} 
      </h1>

      { forProperty && (
        <div className={`${ptsPage ? 'hidden' : ''} sfs:flex mt-auto`}>
           <LayoutSwitch />
        </div>
      )}

    </div>
  )
}

export default Heading