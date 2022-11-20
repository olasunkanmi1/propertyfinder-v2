import React from 'react'

interface IDisclaimerProps {
    agency: string
};

const Disclaimer:React.FC<IDisclaimerProps> = ({agency}) => {
  return (
    <div className='rounded bg-gray-200 p-3 my-3'>
        <h1 className='font-medium text-primary'> Disclaimer. </h1>

        <p className='font-medium'> This Information about this property is provided by {agency}. Property Finder will not be liable for any action of the Agency or property owner. </p>
    </div>
  )
}

export default Disclaimer