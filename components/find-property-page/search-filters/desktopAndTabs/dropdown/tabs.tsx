import React, { useState } from 'react'
import Options from './options'

interface TabsProps {
    categories: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
    }[]
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
    const [toggle, setToggle] = useState<string>(categories[0].placeholder);

    const changeTab = (index: string) => {
        setToggle(index);
    }

  return (
    <div className="pt-[40px]">
        <div className='flex space-x-[10px] w-full absolute top-0'>
            { categories.map((category) => {
                return (
                    <button type="button" key={category.placeholder} 
                        className={` ${toggle === category.placeholder ? 'bg-gray-400 text-white' : ''} text-xs text-black px-[5px] py-2 rounded-md w-1/2`} 
                        onClick={() => changeTab(category.placeholder)}
                    > {category.placeholder} </button>
                )
            }) }
        </div>
         
         { categories.map((category) => {
            return (
                <Options key={category.placeholder} items={category.items} toggle={toggle} />
            )
        }) }
        
    </div>
  )
}

export default Tabs