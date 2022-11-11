import React, { useState, useEffect } from 'react'
import { ICategoryType, ISelectLayoutProps } from '../../../../../types';
import { useRecoilState } from 'recoil'
import { filterAtom, IFilterState } from '../../../../../states';

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

const SelectLayout: React.FC<ISelectLayoutProps> = ({heading, min, max}) => {
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
  }

  useEffect(() => {
    setValue({
      minimum: min,
      maximum: max
    })
  }, [min, max])

    return (
      <div className='space-y-2'>
        <h5 className='text-lg'> {heading} </h5>
  
        <div className='flex justify-between w-full gap-2'>
          <div className='minMaxSort'>
            <p className="text-sm"> Minimum </p>

            <div>
              { value.minimum.list?.map((type) => {
                const { items, placeholder, queryName,  } = type;
                const oppositeQueryName = filterState[value.minimum.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => parseInt(item.value ) < parseInt(oppositeQueryName) )

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                    { oppositeQueryName !== 'any' ? 
                        itemsFilter.map((item) => (
                          <option key={item.name} value={item.value}> {item.name} </option>
                        ))
                       : 
                        items.map((item) => (
                          <option key={item.name} value={item.value}> {item.name} </option>
                        ))
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

                const itemsFilter = items.filter((item) => parseInt(item.value) > parseInt(oppositeQueryName) )

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                    { oppositeQueryName !== '0' ? (
                        itemsFilter.map((item) => (
                          <option key={item.name} value={item.value}> {item.name} </option>
                        ))
                      ) : (
                        items.map((item) => (
                          <option key={item.name} value={item.value}> {item.name} </option>
                        ))
                      )
                    }
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