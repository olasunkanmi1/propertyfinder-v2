import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, searchFiltersState } from '../../../../states';
import { filterData } from '../../../../utils/filterData';
import DropdownWithToggle from './dropdown/with-toggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { IChildProps } from '.';

const Area: React.FC<IChildProps> = ({handleDropdown}) => {
  const dropdown = useRecoilValue(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);
  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');

  return (
    <>
        { purposes.map((purpose) => {
            const { items, placeholder, queryName } = purpose;

            return (
              <div key={placeholder} className='relative'>
                <div className='flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-semibold cursor-pointer'
                    onClick={() => handleDropdown('area')}
                >
                    <p className='select-none'> Area </p>
                    { dropdown ===  'area' ? <AiOutlineUp /> : <AiOutlineDown /> }

                </div>
                {dropdown === 'area' && <DropdownWithToggle state='purpose' title={placeholder} tabs={items} queryName={queryName} /> } 
              </div>
            )

        }) }
    </>
  )
}

export default Area