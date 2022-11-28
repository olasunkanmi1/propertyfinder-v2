import React from 'react'
import { useRecoilValue } from 'recoil';
import { filterAtom, IFilterState, searchFiltersState } from '../../../../states';
import { AiOutlineUp } from 'react-icons/ai';
import DropdownWithMinMax from './dropdown/with-minMax';
import { IMinMaxLayoutProps } from '../../../../types';

const MinMaxLayout: React.FC<IMinMaxLayoutProps> = ({handleDropdown, min, max, array, selected}) => {
  const dropdown = useRecoilValue(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);

  return (
    <>
        { array.map((select) => {
            const { placeholder } = select;

            return (
              <div key={placeholder} className='relative'>
                <div className='flex items-center justify-between bg-white rounded-md text-gray-600 py-1 px-2 text-md font-semibold cursor-pointer'
                    onClick={() => handleDropdown(selected)}
                >
                  <div>
                    <p className='select-none text-sm'> {placeholder} </p>
                    <p className='select-none'> 
                      {` ${filterState[min.queryName as keyof IFilterState]} - ${filterState[max.queryName as keyof IFilterState]} `}
                    </p>
                  </div>
                  <AiOutlineUp className={`transition-all duration-300 ${dropdown.main === selected ? '' : '-rotate-180'}`} />

                </div>
                {dropdown.main === selected && <DropdownWithMinMax title={placeholder} select='rooms' min={min} max={max} /> } 
              </div>
            )

        }) }
    </>
  )
}

export default MinMaxLayout