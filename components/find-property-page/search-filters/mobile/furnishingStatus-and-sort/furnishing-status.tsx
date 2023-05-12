import { useSetRecoilState, useRecoilState } from 'recoil'
import { filterAtom, loadingState } from '@states';
import { selections, findProperties } from '@utils';

const FurnishingStatus = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);

  const furnishedStatus = selections.furnishingStatus
  const { items, placeholder, queryName } = furnishedStatus;

  const setFurnishingStatus = (value: string) => {
    setFilterState(filterState => ({
         ...filterState,
         furnishingStatus: value
     }))
    
     setLoading(loading => ({
         ...loading,
         propertiesLoading: true
     }))

     findProperties({ [queryName]: value }, setLoading)
  }

  return (
    <div className="flex items-center border rounded">
      <div className="grid grid-cols-[25%,35%,40%] ls:flex w-full" key={placeholder}> 
        { items?.map(({name, value}) => (
          <div onClick={() => setFurnishingStatus(value)} key={name} className={`furnishingStatusSort border-l ${ filterState.furnishingStatus === value ? 'bg-secondary text-white' : '' }`}>
          { name }
          </div>
          )) }
      </div>
    </div>
  )
}

export default FurnishingStatus