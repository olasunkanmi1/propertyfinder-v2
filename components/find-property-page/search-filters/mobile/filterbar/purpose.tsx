import React, { useState, useEffect } from 'react'
import { filterAtom } from '../../../../../states';
import { filterData } from '../../../../../utils/filterData';
import { useRecoilState } from 'recoil'

const Purpose = () => {
  const [active, setActive] = useState<string | undefined>('');
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const { purpose } = filterState;

  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');

  const changeTab = (value: string) => {
    setFilterState(filterState => ({
        ...filterState,
        purpose: value,
      }))
  }

  useEffect(() => {
    setActive(purpose)
  }, [purpose])

  return (
    <div className="flex border p-1 rounded">
        { purposes.map((purpose) => {
            const { items, placeholder } = purpose;

            return (
                <div key={placeholder} className='flex w-full'>
                    { items?.map((item) => (
                        <div onClick={() => changeTab(item.value)} key={item.name} className={`tabSort ${active === item.value ? 'tabSortActive' : ''}`}>
                            { item.name }
                        </div>
                    )) }
                </div>
            )

        }) }
    </div>
  )
}

export default Purpose