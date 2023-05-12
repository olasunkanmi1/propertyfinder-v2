import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, searchFiltersState, loadingState } from '@states';
import { IOptionsWithToggleProps, IFilterState } from '@types'
import { findProperties } from '@utils';

const Options: React.FC<IOptionsWithToggleProps> = ({select, options, queryName}) => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setDropdown = useSetRecoilState(searchFiltersState);
  const setLoading = useSetRecoilState(loadingState);

  const handleChange = (value: string, name: string) => {
    if(select === 'propertyType') {
      setFilterState(filterState => ({
        ...filterState,
        propertyType: name
      }))
    }

    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

    setDropdown(dropdown => ({
        ...dropdown,
        main: null
    }))

    setFilterState(filterState => ({
        ...filterState,
        [queryName as keyof IFilterState]: value
    }))

    if(queryName) findProperties({ [queryName]: value }, setLoading) 
  }

  return (    
    <div className="flex justify-between flex-wrap gap-2" key={queryName}>
      { options?.map(({name, value,}) => (
        <div key={name} onClick={() => handleChange(value, name)} 
          className={`flex items-center justify-center py-1 px-2 w-[45%] rounded-full border text-sm cursor-pointer hover:tabSortActive ${filterState[queryName as keyof IFilterState] === value ? 'tabSortActive text-primary' : 'text-black'}`}
        >
            {name}
        </div>
      ))}
    </div>
  )
}

export default Options