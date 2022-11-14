import React, {useState, useEffect} from 'react'
import { filterData } from '../../../../../../utils/filterData';
import { findProperties } from '../..';
import { useRouter } from 'next/router';
import Frequency from './frequency';

const PurposeAndFrequency = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(router.query.purpose);

  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');

  const changeTab = (value: string, queryName: string) => {
    setToggle(value);

    findProperties({ [queryName]: value })
  }

  useEffect(() => {
    setToggle(router.query.purpose)
  }, [router.query.purpose])
  

  return (
    <div className='space-y-4'>
      <div className="flex border p-1 rounded">
          { purposes.map((purpose) => {
              const { items, placeholder, queryName } = purpose;

              return (
                  <div key={placeholder} className='flex w-full'>
                      { items?.map((item) => (
                          <div onClick={() => changeTab(item.value, queryName)} key={item.name} className={`tabSort ${toggle === item.value ? 'tabSortActive' : ''}`}>
                              { item.name }
                          </div>
                      )) }
                  </div>
              )

          }) }
      </div>

      { toggle === 'for-rent' && <Frequency /> }
    </div>  
  )
}

export default PurposeAndFrequency