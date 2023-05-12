import { useRecoilValue } from 'recoil';
import {DropdownLayout} from './';
import {DirectDropdown} from '../dropdown';
import { filterAtom } from '@states';
import { IDirectDropdownLayoutProps, IFilterState } from '@types'

const DirectLayout: React.FC<IDirectDropdownLayoutProps> = ({selected, options}) => {
  const filterState = useRecoilValue(filterAtom);
  const {items, placeholder, queryName} = options
  const Dropdown = () => <DirectDropdown select={selected} title={placeholder} options={items} queryName={queryName} />

  const value = filterState[selected as keyof IFilterState]

  return (
    <DropdownLayout selected={selected} Dropdown={Dropdown}>
      <p className='filterSelect max-w-[calc(100%-20px)] capitalize'> 
        { 
          value === 'any' && selected === 'furnishingStatus' ? 'Furnishing Status' :
          value === 'any' && selected === 'emirates' ? 'Emirates' :
          value === 'any' && selected === 'sortBy' ? 'Sort' :
          value
        } 
      </p>
    </DropdownLayout>          
  )
}

export default DirectLayout