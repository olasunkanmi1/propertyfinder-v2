import { findProperties } from '../../..';
import { filterAtom, IFilterState, searchFiltersState } from '../../../../../../states';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface IOptionsProps {
  items: {
    name: string;
    value: string;
}[];
  queryName: string;
}

const Options: React.FC<IOptionsProps> = ({items, queryName}) => {
    const setDropdown = useSetRecoilState(searchFiltersState);
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
    
        // setLoading(loading => ({
        //   ...loading,
        //   propertiesLoading: true
        // }))
    
         findProperties({ [queryName]: value })
      }
    
  return (
    <div className='absolute top-[37px] left-0 w-full border rounded overflow-auto z-[100] bg-white max-h-[150px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100"'>
      { items.map((item) => {
        const { name, value  } = item;

        return (
            <div key={name} onClick={() => handleChange(value)} className={`flex items-center justify-center w-full hover:bg-primary hover:text-white ${filterState[queryName as keyof IFilterState] === item.value ? 'bg-primary text-white' : ''}`}> {name} </div>
        )
        }) }
    </div>
  )
}

export default Options