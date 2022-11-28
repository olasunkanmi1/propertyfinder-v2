import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { filterAtom, IFilterState } from '../../../../../../states';
import { ICategoryType } from '../../../../../../types'
import { findProperties } from '../../../mobile';

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
  const router = useRouter();
  const [active, setActive] = useState(router.query.rentFrequency);
  const [filterState, setFilterState] = useRecoilState(filterAtom)
  const handleChange = (queryName: string | undefined, value: string) => {
    setActive(value);
    setFilterState(filterState => ({
        ...filterState,
        [options![0].queryName as keyof IFilterState]: value
    }))

    if(queryName) findProperties({ [queryName]: value }) 
  }

  useEffect(() => {
    setActive(router.query.rentFrequency  ? router.query.rentFrequency : 'yearly')
  }, [router.query.rentFrequency])

  return (
    <div>
      { options?.map((option) => {
        const {items, queryName} = option

        return (
          <div className="flex flex-wrap gap-2" key={queryName}>
            { items?.map((item) => {
              const {name, value} = item

              return (
                <div key={name} onClick={() => handleChange(queryName, value)} 
                  className={`flex items-center justify-center py-1 px-2 w-[45%] rounded-full border text-sm text-black cursor-pointer hover:bg-primary hover:bg-opacity-20 hover:border hover:border-primary hover:text-primary ${active === value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}
                >
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