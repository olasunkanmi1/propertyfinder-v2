import React, { useState } from 'react'
import { filterData } from '../../../../../../utils/filterData';
import Commercial from './commercial';
import Residential from './residential';

export interface IPropertyType {
  list?: {
      items: {
          name: string;
          value: string;
          icon?: string;
      }[];
      placeholder: string;
      queryName: string;
  }[];
};

const PropertyType = () => {
  const [toggle, setToggle] = useState('residential');
  const propertyType = filterData.filter((filter) => filter.placeholder === 'Property Type')
  const residentialList = propertyType[0].categories?.filter((filter) => filter.placeholder === 'Residential')
  const commercialList = propertyType[0].categories?.filter((filter) => filter.placeholder === 'Commercial')
  
  const changeTab = (value: string) => {
    setToggle(value);
  }

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Property Type </h5>

      <div className="flex border p-1 rounded">
        <div onClick={() => changeTab('residential')} className={`tabSort ${toggle === 'residential' && 'tabSortActive'}`}>
            Residential
        </div>
        
        <div onClick={() => changeTab('commercial')} className={`tabSort ${toggle === 'commercial' && 'tabSortActive'}`}>
            Commercial
        </div>
      </div>

      { toggle === 'residential' && <Residential list={residentialList} /> }
      { toggle === 'commercial' && <Commercial list={commercialList} /> }
    </div>
  )
}

export default PropertyType