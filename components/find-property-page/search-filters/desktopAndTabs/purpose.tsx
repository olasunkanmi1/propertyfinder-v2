import React from 'react'
import { useRecoilState } from 'recoil';
import { IsearchFiltersState, searchFiltersState } from '../../../../states';
import { filterData } from '../../../../utils/filterData';
import DropdownWithToggle from './dropdown/with-toggle';

const Purpose = () => {
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');
  const handleDropdown = (option: string) => {
    setDropdown({
        // [!option]: false,
        [option]: !dropdown[option as keyof IsearchFiltersState]
    });
  }

  return (
    <>
        { purposes.map((purpose) => {
            const { items, placeholder, queryName, dropdown: dd } = purpose;

            return (
                <div key={placeholder} className='flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-semibold cursor-pointer relative'
                    onClick={() => handleDropdown(dd)}
                >
                    <p className='select-none'> {placeholder} </p>

                    {dropdown[dd as keyof IsearchFiltersState] && <DropdownWithToggle title={placeholder} tabs={items} queryName={queryName} /> } 
                </div>
            )

        }) }
    </>
  )
}

export default Purpose