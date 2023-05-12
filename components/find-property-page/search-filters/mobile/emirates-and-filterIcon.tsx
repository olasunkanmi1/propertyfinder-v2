import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { MdOutlineTune } from 'react-icons/md'
import { selections, findProperties } from '@utils'
import { addressSuggestionsAtom, filterAtom, loadingState, layoutState } from '@states'

const EmiratesAndFilterIcon = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const [layout, setLayout] = useRecoilState(layoutState);
  const resetSuggestions = useResetRecoilState(addressSuggestionsAtom);

  const { isFilterbarOpen } = layout;
  const emirates = selections.emirates
  const { items, placeholder, queryName } = emirates;

    const toggleFilterbar = () => {
      setLayout(layout => ({
            ...layout,
            isFilterbarOpen: !isFilterbarOpen
        }))
    }
    
    const setEmirate = (name: string, value: string) => {
      resetSuggestions();
      setLoading(loading => ({
            ...loading,
            propertiesLoading: true
      }))
      
      setFilterState(filterState => ({
          ...filterState,
          locationExternalIDs: value,
          emirates: name
      }))

      findProperties({ [queryName]: value }, setLoading);
    }

  return (
    <div className='flex justify-between '>
        <div className="flex justify-between rounded overflow-auto w-[calc(100%-43px)] ms:w-[calc(100%-105px)] pb-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
          <div className="flex gap-1" key={placeholder}> 
            { items?.map(({name, value}) => (
              <div onClick={() => setEmirate(name, value)} key={name} className={`flex p-2 border rounded w-max cursor-pointer duration-300 ease-in-out select-none ${ filterState.locationExternalIDs === value ? 'bg-secondary text-white' : '' }`}>
                { name }
              </div>
            )) }
          </div>
        </div>

        <div className="flex items-center gap-2 bg-primary text-white text-sm p-2 rounded ms:w-[98px] mb-3" onClick={toggleFilterbar}>
            <MdOutlineTune size={20} />
            <span className='hidden ms:flex'> FILTERS </span>
        </div>
    </div>
  )
}

export default EmiratesAndFilterIcon