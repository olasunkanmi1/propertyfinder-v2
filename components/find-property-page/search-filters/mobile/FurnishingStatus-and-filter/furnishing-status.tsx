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
    <div className="flex justify-between overflow-auto w-full pb-3">
      <div className="flex space-x-1 w-full" key={placeholder}> 
        { items?.map(({name, value}, i) => (
          <div onClick={() => setFurnishingStatus(value)} key={name} className={`furnishingStatusSort ${ filterState.furnishingStatus === value ? 'bg-secondary border-secondary text-white' : '' }`}>
            { name }
          </div>
          )) }
      </div>
    </div>
  )
}

export default FurnishingStatus