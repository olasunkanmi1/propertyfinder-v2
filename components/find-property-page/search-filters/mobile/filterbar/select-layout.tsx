import React, { useState, useEffect } from 'react'
import { ICategoryType, ISelectLayoutProps } from '../../../../../types';
import { useRecoilState } from 'recoil'
import { filterAtom, IFilterState } from '../../../../../states';
import { findProperties } from '..';
import { useRouter } from 'next/router';

interface IValueProps {
  minimum: {
    list?: ICategoryType[];
    oppositeQueryName: string;
  }

maximum: {
    list?: ICategoryType[];
    oppositeQueryName: string;
  }
}

interface IOptionsProps {
  items: {
    name: string;
    value: string;
  }[], 
  queryName: string
}

const SelectLayout: React.FC<ISelectLayoutProps> = ({heading, min, max}) => {
  const router = useRouter();
  const queries = Object.keys(router.query);

  const [value, setValue] = useState<IValueProps>({
    minimum: min,
    maximum: max
  });
  
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const handleChange = (queryName: string, value: string) => {
    setFilterState(filterState => ({
      ...filterState,
      [queryName]: value,
    }))

     findProperties({ [queryName]: value })
  }

  useEffect(() => {
    setValue({
      minimum: min,
      maximum: max
    })
  }, [min, max])

  const Options = ({items, queryName}: IOptionsProps) => {
      return (
        <>
          { items.map((item) => {
            const { name, value  } = item;
            // const selected = router.query[queryName] ? router.query[queryName] === item.value : !queries.includes(queryName) ? undefined : filterState[queryName as keyof IFilterState] === item.value
            const selected = router.query[queryName] ? router.query[queryName] === item.value : filterState[queryName as keyof IFilterState] === item.value

            return (
              <option selected={selected} key={name} value={value}> {name} </option>
            )
          }) }
        </>
      )
  }

    return (
      <div className='space-y-2'>
        <h5 className='text-lg'> {heading} </h5>
  
        <div className='flex justify-between w-full gap-2'>
          <div className='minMaxSort'>
            <p className="text-sm"> Minimum </p>

            <div>
              { value.minimum.list?.map((type) => {
                const { items, placeholder, queryName  } = type;
                const oppositeQueryName = filterState[value.minimum.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => parseInt(item.value ) < parseInt(oppositeQueryName) );
                
                return (
                  <select key={placeholder} className='minMaxSort_select'
                  onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                    { oppositeQueryName !== 'any' ? 
                        <Options items={itemsFilter} queryName={queryName} />
                        : 
                        <Options items={items} queryName={queryName} />
                    }
                  </select>
                )
              }) }
            </div>
          </div>
          
          <div className='minMaxSort'>  
            <p className="text-sm"> Maximum </p>

            <div>
              { value.maximum.list?.map((sort) => {
                const { items, placeholder, queryName } = sort;
                const oppositeQueryName = filterState[value.maximum.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => item.value === 'any' || parseInt(item.value) > parseInt(oppositeQueryName))

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                        <Options items={itemsFilter} queryName={queryName} />
                  </select>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    )
}

export default SelectLayout