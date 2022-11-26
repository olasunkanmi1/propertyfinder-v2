import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, searchFiltersState } from '../../../../states';
import { filterData } from '../../../../utils/filterData';
import DropdownWithToggle from './dropdown/with-toggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { IChildProps } from '.';

const Price: React.FC<IChildProps> = ({handleDropdown}) => {
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
                    onClick={() => handleDropdown('price')}
                >
                    <p className='select-none'> Price </p>
                    { dropdown ===  'price' ? <AiOutlineUp /> : <AiOutlineDown /> }

                </div>
                {dropdown === 'price' && <DropdownWithToggle state='purpose' title={placeholder} tabs={items} queryName={queryName} /> } 
              </div>
            )

        }) }
    </>
  )
}

export default Price