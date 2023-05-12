import { useRecoilState, useSetRecoilState } from 'recoil'
import { BsSortDown } from 'react-icons/bs';
import { selections, findProperties } from '@utils';
import { filterAtom, loadingState } from '@states';

const Sort = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);

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
    <div className='flex items-center justify-end ls:justify-center gap-1 text-secondary font-bold'> 
      <BsSortDown size={25} />

      <select className="flex outline-none te appearance-none bg-transparent" key={placeholder}
        onChange={(e) => setSortBy(e.target.value, e.target.options[e.target.selectedIndex].innerText)}
      > 
        { items?.map(({name, value}) => (
            <option selected={filterState.sort === value} key={name} value={value}> {name} </option>
        )) }
      </select>
    </div> 
  )
}

export default Sort