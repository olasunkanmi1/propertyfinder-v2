import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { filterAtom, IFilterState } from '../../../../../../states';
import { ICategoryType } from '../../../../../../types'
import { findProperties } from '../../..';

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
})[];
select: string;
}

const Options: React.FC<IOptionsProps> = ({options, select}) => {
  const router = useRouter();
  const [active, setActive] = useState(select === 'purpose' ? router.query.rentFrequency : router.query.categoryExternalID);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const handleChange = (queryName: string | undefined, value: string, name: string) => {
    setActive(value);
    if(select === 'property-type') {
      setFilterState(filterState => ({
        ...filterState,
        propertyType: name
      }))
    }

    setFilterState(filterState => ({
        ...filterState,
        [options![0].queryName as keyof IFilterState]: value
    }))


    if(queryName) findProperties({ [queryName]: value }) 
  }

  useEffect(() => {
    if(select === 'purpose') {
      setActive(router.query.rentFrequency  ? router.query.rentFrequency : 'any')
    } else {
      setActive(router.query.categoryExternalID  ? router.query.categoryExternalID : '1')
    }
  }, [router.query.rentFrequency, router.query.categoryExternalID, select])

  return (
    <div>
      { options?.map((option) => {
        const {items, queryName} = option

        return (
          <div className="flex justify-between flex-wrap gap-2" key={queryName}>
            { items?.map((item) => {
              const {name, value} = item

              return (
                <div key={name} onClick={() => handleChange(queryName, value, name)} 
                  className={`flex items-center justify-center py-1 px-2 w-[45%] rounded-full border text-sm cursor-pointer hover:tabSortActive ${active === value ? 'tabSortActive text-primary' : 'text-black'}`}
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