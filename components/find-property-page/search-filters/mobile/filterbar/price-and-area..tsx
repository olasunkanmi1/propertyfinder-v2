import { filterData } from '../../../../../utils/filterData';
import SelectLayout from './select-layout'

const PriceAndArea = () => {
  const price = filterData.filter((filter) => filter.placeholder === 'Price (AED)');
  const area = filterData.filter((filter) => filter.placeholder === 'Area (sqft)');
  
  const priceMin = {
    list: price[0].categories?.filter((filter) => filter.placeholder === 'Min Price(AED)'),
    oppositeQueryName: 'priceMax'
  };
  
  const priceMax = {
    list: price[0].categories?.filter((filter) => filter.placeholder === 'Max Price(AED)'),
    oppositeQueryName: 'priceMin'
  };
  
  const areaMin = {
    list: area[0].categories?.filter((filter) => filter.placeholder === 'Min Area (sqft)'),
    oppositeQueryName: 'areaMax'
  };
  
  const areaMax = {
    list: area[0].categories?.filter((filter) => filter.placeholder === 'Max Area (sqft)'),
    oppositeQueryName: 'areaMin'
  };

  return (
    <div className='space-y-4'>
      <SelectLayout heading='Price (AED)' min={priceMin} max={priceMax} />
      <SelectLayout heading='Area (sqft)' min={areaMin} max={areaMax} />
    </div> 
  )
}

export default PriceAndArea