import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilState } from 'recoil'
import { findProperties } from '../..';
import { filterAtom, loadingState } from '../../../../../states';
import { filterData } from '../../../../../utils/filterData';

const FurnishingStatus = () => {
  const router = useRouter();
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);

  const furnishedStatus = filterData.filter((filter) => filter.placeholder === 'Furnishing Status')

  const setFurnishingStatus = (value: string, queryName: string) => {
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

  return (
    <div className="flex items-center border rounded">
        { furnishedStatus.map((status) => {
            const { items, placeholder, queryName } = status;

            return (
                <div className="grid grid-cols-[25%,35%,40%] ls:flex w-full" key={placeholder}> 
                  { items?.map((item) => (
                    <div onClick={() => setFurnishingStatus(item.value, queryName)} key={item.name} className={`furnishingStatusSort border-l ${ filterState.furnishingStatus === item.value ? 'bg-secondary text-white' : '' }`}>
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