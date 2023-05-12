import { useRecoilState, useSetRecoilState } from 'recoil';
import RentFrequency from './rent-frequency';
import { filterAtom, loadingState } from '@states';
import { selections, findProperties } from '@utils';

const PurposeAndFrequency = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const purposes = selections.purposes
  const { items, placeholder, queryName } = purposes;

  const changeTab = (value: string, queryName: string) => {
    setFilterState(filterState => ({
      ...filterState,
      purpose: value
    }))
    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

    findProperties({ [queryName]: value }, setLoading)
  }

  return (
    <div className='space-y-4'>
      <div className="flex border p-1 rounded">
        <div key={placeholder} className='flex w-full'>
          { items?.map(({name, value}) => (
              <div onClick={() => changeTab(value, queryName)} key={name} className={`tabSort ${filterState.purpose === value ? 'tabSortActive' : ''}`}>
                  { name }
              </div>
          )) }
        </div>
      </div>

      { filterState.purpose === 'for-rent' && <RentFrequency /> }
    </div>  
  )
}

export default PurposeAndFrequency