import React from 'react'
import { ISelectLayoutProps } from '../../../../../types';

const SelectLayout: React.FC<ISelectLayoutProps> = ({heading, min, max}) => {
    return (
      <div className='space-y-2'>
        <h5 className='text-lg'> {heading} </h5>
  
        <div className='flex justify-between w-full gap-2'>
          <div className='minMaxSort'>
            <p className="text-sm"> Minimum </p>

            <div>
              { min?.map((type) => {
                const { items, placeholder } = type;

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {}}
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
                const { items, placeholder } = sort;

                return (
                  <select key={placeholder} className='minMaxSort_select'
                  onChange={(e) => {}}
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