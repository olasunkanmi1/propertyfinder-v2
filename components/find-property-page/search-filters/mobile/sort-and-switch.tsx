import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { BsSortDown } from 'react-icons/bs';
import LayoutSwitch from 'components/property/layout-switch';
import { selections, findProperties } from '@utils';
import { filterAtom, loadingState, propertiesState } from '@states';

const SortAndSwitch = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);
  const pts = useRecoilValue(propertiesState);

  const {properties} = pts;

  const sortBy = selections.sort
  const { items, placeholder, queryName } = sortBy;

  const setSortBy = (value: string, name: string) => {
    setFilterState(filterState => ({
         ...filterState,
         sort: value,
         sortBy: name
     }))
    
     setLoading(loading => ({
         ...loading,
         propertiesLoading: true
     }))

     findProperties({ [queryName]: value }, setLoading)
  }

  return (
    <div className='wrapper'>
        <div className='flex justify-between items-center mt-1'>
          <div className='flex items-center justify-start gap-1 mb-auto text-secondary font-bold relative pr-[110px]'> 
            <BsSortDown size={25} /> Sort:

            <select className="flex outline-none appearance-none bg-transparent absolute left-0 pl-[70px]" key={placeholder}
              onChange={(e) => setSortBy(e.target.value, e.target.options[e.target.selectedIndex].innerText)}
            > 
              { items?.map(({name, value}) => (
                  <option selected={filterState.sort === value} key={name} value={value}> {name} </option>
              )) }
            </select>
          </div> 

          {properties?.length! > 0 && (
            <div className='hidden ls:flex xls:hidden'>
              <LayoutSwitch />
            </div>
          )}
        </div> 
    </div> 
  )
}

export default SortAndSwitch