import { minMaxLayoutArray } from '@utils';
import SelectLayout from './select-layout'

const PriceAndArea = () => {
  const price = minMaxLayoutArray.find(minMax => minMax.selected === 'price')!
  const area = minMaxLayoutArray.find(minMax => minMax.selected === 'area')!

  const {min: priceMin, max: priceMax} = price
  const {min: areaMin, max: areaMax} = area

  return (
    <div className='space-y-4'>
      <SelectLayout heading='Price (AED)' min={priceMin} max={priceMax} />
      <SelectLayout heading='Area (sqft)' min={areaMin} max={areaMax} />
    </div> 
  )
}

export default PriceAndArea