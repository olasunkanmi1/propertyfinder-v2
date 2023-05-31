import LayoutSwitch from "components/property/layout-switch"
import { HeadingProps } from "@types"

const Heading: React.FC<HeadingProps> = ({heading, forProperty, ptsPage}) => {
  return (
    <div className={`flex items-center space-x-3 justify-center ${forProperty ? 'ls:justify-between' : ''}`}>
      <h1 
        className={`text-xl ms:text-2xl text-primary font-semibold whitespace-normal
        ${ptsPage ? 'mx-auto text-center xls:text-left xls:mx-0' : ''}
        `}
      > 
        {heading} 
      </h1>

      { forProperty && (
        <div className={`hidden mt-auto ${ptsPage ? 'xls:flex' : 'ls:flex'}`}>
           <LayoutSwitch />
        </div>
      )}

    </div>
  )
}

export default Heading