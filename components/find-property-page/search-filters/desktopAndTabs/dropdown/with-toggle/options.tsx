import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, searchFiltersState, loadingState } from '../../../../../../states';
import { ICategoryType } from '../../../../../../types'
import { findProperties } from '../../../../../../utils/findProperty/findProperties';

interface IOptionsProps {
  options?: ICategoryType[] | ({
    items: {
        name: string;
        value: string;
    }[];
    placeholder: string;
    queryName: string;
    dropdown: string;
    categories?: undefined;
} | {
    categories: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
    }[];
    placeholder: string;
    dropdown: string;
    items?: undefined;
    queryName?: undefined;
} | {
  items?: {
    name: string;
    value: string;
}[];
queryName?: string;
})[];
select: string;
}

const Options: React.FC<IOptionsProps> = ({options, select}) => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setDropdown = useSetRecoilState(searchFiltersState);
  const setLoading = useSetRecoilState(loadingState);

  const handleChange = (queryName: string | undefined, value: string, name: string) => {
    if(select === 'property-type') {
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
        [options![0].queryName as keyof IFilterState]: value
    }))

    if(queryName) findProperties({ [queryName]: value }, setLoading) 
  }

  return (
    <div>
      { options?.map((option) => {
        const {items, queryName} = option

        return (
          <div className="flex justify-between flex-wrap gap-2" key={queryName}>
            { items?.map((item) => {
              const {name, value} = item

              return (
                <div key={name} onClick={() => handleChange(queryName, value, name)} 
                  className={`flex items-center justify-center py-1 px-2 w-[45%] rounded-full border text-sm cursor-pointer hover:tabSortActive ${filterState[queryName as keyof IFilterState] === value ? 'tabSortActive text-primary' : 'text-black'}`}
                >
                    {name}
                </div>
              )
            })}
            </div>
        )
      }) }
      
    </div>
  )
}

export default Options