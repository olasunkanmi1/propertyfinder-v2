import React, {useState, useEffect} from 'react'
import { filterData } from '../../../../../../utils/filterData';
import { findProperties } from '../..';
import { useRouter } from 'next/router';

const Frequency  = () => {
  const router = useRouter();
  const [active, setActive] = useState(router.query.rentFrequency);

  const frequencies = filterData.filter((filter) => filter.placeholder === 'Rent Frequency');

  const changeTab = (value: string, queryName: string) => {
    setActive(value);

    findProperties({ [queryName]: value })
  }

  useEffect(() => {
    setActive(router.query.rentFrequency)
  }, [router.query.rentFrequency])

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Rental Frequency </h5>

      <div className='flex overflow-auto w-full gap-2 pb-4'>
        { frequencies.map((frequency) => {
            const { items, placeholder, queryName } = frequency;

            return (
              <div key={placeholder} className='flex gap-2'>
                  { items?.map((item) => (
                      <div onClick={() => changeTab(item.value, queryName)} key={item.name} className={`frequencySort ${active === item.value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}>
                          { item.name }
                      </div>
                  )) }
              </div>
            )

        }) }
      </div>
    </div>
  )
}

export default Frequency