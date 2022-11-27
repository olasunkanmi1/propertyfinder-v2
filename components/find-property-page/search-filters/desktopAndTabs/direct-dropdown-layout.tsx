import React from 'react'
import { AiOutlineUp } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { searchFiltersState } from '../../../../states';
import { IDirectDropdownLayoutProps } from '../../../../types'
import DirectDropdown from './dropdown/direct';

const DirectDropdownLayout: React.FC<IDirectDropdownLayoutProps> = ({handleDropdown, selected, array}) => {
  const dropdown = useRecoilValue(searchFiltersState);

  return (
    <>
        { array.map((select) => {
            const { items, placeholder, queryName } = select;

            return (
              <div key={placeholder} className='relative'>
                <div className='flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-semibold cursor-pointer'
                    onClick={() => handleDropdown(selected)}
                >
                    <p className='select-none'> {placeholder} </p>
                    <AiOutlineUp className={`transition-all duration-300 ${dropdown.main === selected ? '' : '-rotate-180'}`} />

                </div>
                {dropdown.main === selected && <DirectDropdown title={placeholder} options={items} queryName={queryName} /> } 
              </div>
            )

        }) }
    </>
  )
}

export default DirectDropdownLayout