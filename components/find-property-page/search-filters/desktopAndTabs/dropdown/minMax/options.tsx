import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, searchFiltersState, loadingState } from '@states';
import { findProperties } from '@utils';
import { IFilterState, IOptionsProps } from '@types';

const Options: React.FC<IOptionsProps> = ({items, queryName}) => {
    const setDropdown = useSetRecoilState(searchFiltersState);
  const setLoading = useSetRecoilState(loadingState);
    const [filterState, setFilterState] = useRecoilState(filterAtom);

    const handleChange = (value: string) => {
        setDropdown( dropdown => ({
            ...dropdown,
            minMax: null
        }));
        
        setFilterState(filterState => ({
          ...filterState,
          [queryName]: value,
        }))
    
        setLoading(loading => ({
          ...loading,
          propertiesLoading: true
        }))
    
         findProperties({ [queryName]: value }, setLoading)
      }
    
  return (
    <div className='absolute top-[37px] left-0 w-full border rounded overflow-auto z-[100] bg-white max-h-[150px] text-sm scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
      { items.map(({name, value}) => (
         <div key={name} onClick={() => handleChange(value)} className={`flex items-center w-full hover:bg-primary hover:text-white ${value !== 'any' && parseInt(value) > 900000 ? 'justify-start pl-1' : 'justify-center'} ${filterState[queryName as keyof IFilterState] === value ? 'bg-primary text-white' : ''}`}> {name} </div>
      )) }
    </div>
  )
}

export default Options