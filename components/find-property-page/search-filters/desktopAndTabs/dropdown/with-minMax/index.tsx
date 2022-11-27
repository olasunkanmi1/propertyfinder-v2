import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, loadingState, searchFiltersState } from '../../../../../../states';
import { ICategoryType, IDropdownWithMinMaxProps } from '../../../../../../types';
import Options from './options';
import { useRouter } from 'next/router';

interface IValueProps {
    minimum: {
      list?: ICategoryType[];
      oppositeQueryName: string;
    }
  
  maximum: {
      list?: ICategoryType[];
      oppositeQueryName: string;
    }
}

const DropdownWithMinMax: React.FC<IDropdownWithMinMaxProps> = ({ select, title, min, max }) => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);

  const [value, setValue] = useState<IValueProps>({
    minimum: min,
    maximum: max
  });

  const handleDropdown = (dropdownValue: string) => {
    if(dropdown.minMax === dropdownValue) {
      setDropdown( dropdown => ({
        ...dropdown,
        minMax: null
      }))
    } else {
       setDropdown(dropdown => ({
        ...dropdown,
        minMax: dropdownValue
       }))
    }
  }

  useEffect(() => {
    setValue({
      minimum: min,
      maximum: max
    })
  }, [min, max])

  return (
    <div className={`space-y-2 absolute top-[50px]  rounded border p-2 bg-white z-20 ${select === '' ? 'right-0 w-[370px]' : 'left-0 w-full'}`}>
      <h5 className='text-black font-semibold'> {title} </h5>

      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[45%] text-black space-y-1">
            { value.minimum.list?.map((type) => {
                const { items, placeholder, queryName  } = type;
                const oppositeQueryName = filterState[value.minimum.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => parseInt(item.value ) < parseInt(oppositeQueryName.toString()) );
                
                return (
                    <div key={placeholder} className='z-50'>
                        <p className='text-xs font-semibold'> Minimum </p>
                        <span onClick={() => handleDropdown('min')} className='flex border relative rounded py-1 px-2   w-full z-50 cursor-pointer font-semibold select-none'> 
                            {filterState[queryName as keyof IFilterState]} 

                            {dropdown.minMax === 'min' && ( 
                                oppositeQueryName !== 'any' ? 
                                <Options items={itemsFilter} queryName={queryName} />
                                : 
                                <Options items={items} queryName={queryName} />
                            )}
                        </span>
                    </div>
                )
            }) }
        </div>

        <div className="flex flex-col w-[45%] text-black space-y-1">
            { value.maximum.list?.map((sort) => {
                const { items, placeholder, queryName } = sort;
                const oppositeQueryName = filterState[value.maximum.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => item.value === 'any' || parseInt(item.value) > parseInt(oppositeQueryName.toString()))

                return (
                    <>
                        <div key={placeholder}>
                            <p className='text-xs font-semibold'> Maximum </p>

                            <span onClick={() => handleDropdown('max')} className='flex border relative rounded py-1 px-2  w-full cursor-pointer font-semibold select-none'> 
                                {filterState[queryName as keyof IFilterState]} 

                                { dropdown.minMax === 'max' && <Options items={itemsFilter} queryName={queryName} /> }
                            </span>
                        </div>
                    </>
                )
              }) }
        </div>
      </div>
    </div>
  )
}

export default DropdownWithMinMax