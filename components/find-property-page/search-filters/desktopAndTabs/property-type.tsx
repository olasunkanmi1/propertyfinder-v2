import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, searchFiltersState } from '../../../../states';
import { filterData } from '../../../../utils/filterData';
import DropdownWithToggle from './dropdown/with-toggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { IChildProps } from '.';

const PropertyType: React.FC<IChildProps> = ({handleDropdown}) => {
  const dropdown = useRecoilValue(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);
  const propertyTypes = filterData.filter((filter) => filter.placeholder === 'Property Type');

  return (
    <>
        { propertyTypes.map((type) => {
            const { categories, placeholder } = type;

            return (
              <div key={placeholder} className='relative'>
                <div className='flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-semibold cursor-pointer'
                    onClick={() => handleDropdown('property-type')}
                >
                    <p className='select-none'> {filterState.purpose === 'for-rent' ? 'RENT' : 'BUY'} </p>
                    { dropdown ===  'property-type' ? <AiOutlineUp /> : <AiOutlineDown /> }

                </div>
                {dropdown === 'property-type' && <DropdownWithToggle state='' title={placeholder} categories={categories} /> } 
              </div>
            )

        }) }
    </>
  )
}

export default PropertyType