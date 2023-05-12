import { useRecoilValue } from 'recoil';
import {DropdownLayout} from '.';
import {MinMaxDropdown} from '../dropdown';
import { filterAtom } from '@states';
import { IFilterState, IMinMaxLayoutProps } from '@types';

const MinMaxLayout: React.FC<IMinMaxLayoutProps> = ({min, max, placeholder, selected}) => {
  const filterState = useRecoilValue(filterAtom);
  const {items: minItems, queryName: minQueryName, oppositeQueryName: minOppositeQueryName} = min;
  const {items: maxItems, queryName: maxQueryName, oppositeQueryName: maxOppositeQueryName} = max;

  const minOppositeQueryNameValue = filterState[minOppositeQueryName as keyof IFilterState]
  const minFilteredItems = minOppositeQueryNameValue === 'any' ? minItems : minItems.filter((item) => parseInt(item.value) < parseInt(minOppositeQueryNameValue.toString()) )
  
  const maxOppositeQueryNameValue = filterState[maxOppositeQueryName as keyof IFilterState]
  const maxFilteredItems = maxItems.filter((item) => item.value === 'any' || parseInt(item.value) > parseInt(maxOppositeQueryNameValue.toString()) )

  const minMaxValues = {
    values: [
      {
        title: 'Minimum',
        queryName: minQueryName,
        filteredItems: minFilteredItems,
      },
      {
        title: 'Maximum',
        queryName: maxQueryName,
        filteredItems: maxFilteredItems,
      }
    ],
    minKey: minQueryName,
    maxKey: maxQueryName,
    minValue: filterState[minQueryName as keyof IFilterState],
    maxValue: filterState[maxQueryName as keyof IFilterState]
  }

  const Dropdown = () => <MinMaxDropdown title={placeholder} select={selected} minMaxValues={minMaxValues} />


  return (    
    <DropdownLayout selected={selected} Dropdown={Dropdown}> 
      <div className='max-w-[calc(100%-20px)]'>
        <p className='select-none text-sm'> {placeholder} </p>
        <p className='filterSelect'> 
          { filterState[minQueryName as keyof IFilterState] }
            {' - '} 
          { filterState[maxQueryName as keyof IFilterState] === 'any' ? 'Any' : filterState[maxQueryName as keyof IFilterState] }
        </p>
      </div>
    </DropdownLayout>
           
  )
}

export default MinMaxLayout