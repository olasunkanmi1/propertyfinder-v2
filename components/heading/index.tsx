import React from 'react'

interface HeadingProps {
    heading: string;
}

const Heading: React.FC<HeadingProps> = ({heading}) => {
  return (
    <h1 className="mx-auto text-2xl ms:text-4xl text-primary font-semibold items-center text-center whitespace-normal"> {heading} </h1>
  )
}

export default Heading