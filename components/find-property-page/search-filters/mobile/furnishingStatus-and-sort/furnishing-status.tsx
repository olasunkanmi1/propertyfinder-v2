import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil'
import { findProperties } from '../..';
import { filterAtom, loadingState } from '../../../../../states';
import { filterData } from '../../../../../utils/filterData';

const FurnishingStatus = () => {
  const router = useRouter();
  const setFilterState = useSetRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);
  const [active, setActive] = useState(router.query.furnishingStatus);

  const furnishedStatus = filterData.filter((filter) => filter.placeholder === 'Furnishing Status')

  const setFurnishingStatus = (value: string, queryName: string) => {
    setActive(value)
    setFilterState(filterState => ({
         ...filterState,
         furnishingStatus: value
     }))
    
     setLoading(loading => ({
         ...loading,
         propertiesLoading: true
     }))

     findProperties({ [queryName]: value })
  }

  useEffect(() => {
    setActive(router.query.furnishingStatus  ? router.query.furnishingStatus : 'any')
  }, [router.query.furnishingStatus]);

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