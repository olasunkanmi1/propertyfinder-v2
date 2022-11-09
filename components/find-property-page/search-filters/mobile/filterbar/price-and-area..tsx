import React from 'react'
import { filterData } from '../../../../../utils/filterData';
import SelectLayout from './select-layout'

const PriceAndArea = () => {
  const price = filterData.filter((filter) => filter.placeholder === 'Price(AED)');
  const area = filterData.filter((filter) => filter.placeholder === 'Area (sqft)');
  
  const priceMin = price[0].categories?.filter((filter) => filter.placeholder === 'Min Price(AED)');
  const priceMax = price[0].categories?.filter((filter) => filter.placeholder === 'Max Price(AED)');
  const areaMin = area[0].categories?.filter((filter) => filter.placeholder === 'Min Area (sqft)');
  const areaMax = area[0].categories?.filter((filter) => filter.placeholder === 'Max Area (sqft)');

  return (
    <div className='space-y-4'>
      <SelectLayout heading='Price' min={priceMin} max={priceMax} />
      <SelectLayout heading='Area' min={areaMin} max={areaMax} />
    </div>
  )
}

export default PriceAndArea