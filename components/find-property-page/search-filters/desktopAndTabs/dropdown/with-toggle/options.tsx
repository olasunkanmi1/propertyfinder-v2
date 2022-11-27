import React from 'react'
import { ICategoryType } from '../../../../../../types'

interface IOptionsProps {
  options?: ICategoryType[] | ({
    items: {
        name: string;
        value: string;
    }[];
    placeholder: string;
    queryName: string;
    dropdown: string;
    categories?: undefined;
} | {
    categories: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
    }[];
    placeholder: string;
    dropdown: string;
    items?: undefined;
    queryName?: undefined;
} | {
  items?: {
    name: string;
    value: string;
}[];
queryName?: string;
})[]
}

const Options: React.FC<IOptionsProps> = ({options}) => {
  return (
    <div>
      { options?.map((option) => {
        const {items, queryName} = option

        return (
          <div className="flex flex-wrap gap-2" key={queryName}>
            { items?.map((item) => {
              const {name, value} = item

              return (
                <div key={name} className='flex items-center justify-center py-1 px-2 w-[45%] rounded-full border text-sm text-black cursor-pointer'>
                    {name}
                </div>
              )
            })}
            </div>
        )
      }) }
      
    </div>
  )
}

export default Options