import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { findProperties } from '..';
import { filterAtom } from '../../../../../states';
import { filterData } from '../../../../../utils/filterData';

const FurnishingStatus = () => {
  const [active, setActive] = useState<string | undefined>('');
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const { furnishingStatus } = filterState;

  const furnishedStatus = filterData.filter((filter) => filter.placeholder === 'Furnish Type')

  const setFurnishingStatus = (value: string, queryName: string) => {
    setFilterState(filterState => ({
         ...filterState,
         furnishingStatus: value
     }))

     findProperties({ [queryName]: value })
  }

  useEffect(() => {
    setActive(furnishingStatus)
  }, [furnishingStatus])

  return (
    <div className="flex items-center border rounded">
        { furnishedStatus.map((status) => {
            const { items, placeholder, queryName } = status;

            return (
                <div className="grid grid-cols-[25%,35%,40%] ls:flex w-full" key={placeholder}> 
                  { items?.map((item) => (
                    <div onClick={() => setFurnishingStatus(item.value, queryName)} key={item.name} className={`furnishingStatusSort border-l ${ active === item.value ? 'bg-secondary text-white' : '' }`}>
                    { item.name }
                    </div>
                    )) }
                </div>
            )
        }) }
    </div>
  )
}

export default FurnishingStatus