import React from 'react'
import { ISelectLayoutProps } from '../../../../../types';
import { useRecoilState } from 'recoil'
import { filterAtom } from '../../../../../states';

const SelectLayout: React.FC<ISelectLayoutProps> = ({heading, min, max}) => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const handleChange = (queryName: string, value: string) => {
    setFilterState(filterState => ({
      ...filterState,
      [queryName]: value,
    }))
  }

    return (
      <div className='space-y-2'>
        <h5 className='text-lg'> {heading} </h5>
  
        <div className='flex justify-between w-full gap-2'>
          <div className='minMaxSort'>
            <p className="text-sm"> Minimum </p>

            <div>
              { min?.map((type) => {
                const { items, placeholder, queryName } = type;
                // const itemsFilter = items.filter((filter) => filter.value <  )

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {handleChange(queryName, e.target.value )}}
                    > 
                    { items?.map((item) => (
                        <option key={item.name} value={item.value}> {item.name} </option>
                    )) }
                  </select>
                )
              }) }
            </div>
          </div>
          
          <div className='minMaxSort'>  
            <p className="text-sm"> Maximum </p>

            <div>
              { max?.map((sort) => {
                const { items, placeholder, queryName } = sort;

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                    { items?.map((item) => (
                        <option key={item.name} value={item.value}> {item.name} </option>
                    )) }
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