import React from 'react'

interface OptionsProps {
    items: { 
        name: string; 
        value: string; 
    }[];
    toggle?: string;
}

const Options: React.FC<OptionsProps> = ({items}) => {
  return (
    <div className="flex flex-col space-y-2">
        { items.map((item) => {
            return (
                <h1 key={item.name} className="font-bold text-semibold"> { item.name } </h1>
            )
        }) }
    </div>
  )
}

export default Options