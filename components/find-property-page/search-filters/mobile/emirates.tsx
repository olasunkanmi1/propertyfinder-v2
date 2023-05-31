import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { selections, findProperties } from '@utils'
import { addressSuggestionsAtom, filterAtom, loadingState, layoutState } from '@states'

const Emirates = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const [layout, setLayout] = useRecoilState(layoutState);
  const resetSuggestions = useResetRecoilState(addressSuggestionsAtom);

  const { isFilterbarOpen } = layout;
  const emirates = selections.emirates
  const { items, placeholder, queryName } = emirates;

    
    
    const setEmirate = (name: string, value: string) => {
        resetSuggestions();
        setLoading(loading => ({
            ...loading,
            propertiesLoading: true
        }))
        
        setFilterState(filterState => ({
            ...filterState,
            locationExternalIDs: value,
            emirates: name,
            address: ''
        }))

        findProperties({ [queryName]: value }, setLoading);
    }

  return (
    <div className="flex justify-between overflow-auto pb-3 mt-1 px-3 sm:px-8">
      <div className="flex gap-1" key={placeholder}> 
        { items?.map(({name, value}) => (
          <div onClick={() => setEmirate(name, value)} key={name} className={`flex p-2 border rounded w-max cursor-pointer duration-300 ease-in-out select-none ${ filterState.locationExternalIDs === value ? 'bg-secondary border-secondary text-white' : '' }`}>
            { name }
          </div>
        )) }
      </div>
    </div>
  )
}

export default Emirates