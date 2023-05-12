import { useRecoilValue } from 'recoil';
import {DropdownLayout} from '.';
import {ToggleDropdown} from '../dropdown';
import { filterAtom } from '@states';
import { IToggleLayoutProps } from '@types';

const ToggleLayout: React.FC<IToggleLayoutProps> = ({selected, options}) => {
  const filterState = useRecoilValue(filterAtom);
  const { placeholder, queryName, items, categories } = options
  const {purpose, rentFrequency, propertyType} = filterState
  const upperCaseRentFrequency = rentFrequency.toString().toUpperCase();

  const Dropdown = () => <ToggleDropdown select={selected} title={placeholder} items={items} categories={categories} queryName={queryName} />

  return (  
    <div className={`${selected === 'purpose' ? 'col-start-1 row-start-1' : ''}`}>
      <DropdownLayout selected={selected} Dropdown={Dropdown}>
        { selected === 'purpose' ? (
          <p className='filterSelect max-w-[calc(100%-20px)]'> {purpose === 'for-rent' ? `Rent ${rentFrequency !== 'any' ? `(${upperCaseRentFrequency})` : ''}` : 'Buy'} </p> 
        ) : (
          <p className='filterSelect max-w-[calc(100%-20px)]'> {propertyType} </p>
        ) }
      </DropdownLayout>
    </div>
  )
}

export default ToggleLayout