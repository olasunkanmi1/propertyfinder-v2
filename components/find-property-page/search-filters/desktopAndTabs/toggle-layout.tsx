import { useRecoilValue } from 'recoil';
import { filterAtom, searchFiltersState } from '../../../../states';
import DropdownWithToggle from './dropdown/with-toggle';
import { AiOutlineUp } from 'react-icons/ai';
import { IToggleLayoutProps } from '../../../../types';
import { useRouter } from 'next/router';

const ToggleLayout: React.FC<IToggleLayoutProps> = ({handleDropdown, selected, array}) => {
  const dropdown = useRecoilValue(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);

  return (
    <>
        { array.map((purpose) => {
            const { items, categories, placeholder, queryName } = purpose;

            return (
              <div key={placeholder} className='relative'>
                <div className='flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-semibold cursor-pointer'
                    onClick={() => handleDropdown(selected)}
                >
                    { selected === 'purpose' ? (
                        <p className='filterSelect max-w-[calc(100%-20px)]'> {filterState.purpose === 'for-rent' ? `Rent ${filterState.rentFrequency !== 'any' ? `(${filterState.rentFrequency})` : ''}` : 'Buy'} </p> 
                    ) : (
                        <p className='filterSelect max-w-[calc(100%-20px)]'> {filterState.propertyType} </p>
                    ) }
                    <AiOutlineUp className={`transition-all duration-300 ${dropdown.main === selected ? '' : '-rotate-180'}`} />
                </div>
                { dropdown.main === selected && <div className='tooltip' /> }

                { selected === 'purpose' && dropdown.main === selected ? (
                    <DropdownWithToggle select={selected} title={placeholder} tabs={items} queryName={queryName} />
                ) :  selected === 'property-type' && dropdown.main === selected ? (
                    <DropdownWithToggle select='property-type' title={placeholder} categories={categories} /> 
                ) : null }

              </div>
            )

        }) }
    </>
  )
}

export default ToggleLayout