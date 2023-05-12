import { useRecoilState, useSetRecoilState } from 'recoil'
import { IOptionsProps, ISelectLayoutProps, IFilterState } from '@types';
import { filterAtom, loadingState } from '@states';
import { findProperties } from '@utils';

const SelectLayout: React.FC<ISelectLayoutProps> = ({heading, min, max}) => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);
  const {items: minItems, queryName: minQueryName, oppositeQueryName: minOppositeQueryName} = min;
  const {items: maxItems, queryName: maxQueryName, oppositeQueryName: maxOppositeQueryName} = max;

  const minOppositeQueryNameValue = filterState[minOppositeQueryName as keyof IFilterState]!
  const minFilteredItems = minOppositeQueryNameValue === 'any' ? minItems : minItems.filter((item) => parseInt(item.value) < parseInt(minOppositeQueryNameValue.toString()) )
  
  const maxOppositeQueryNameValue = filterState[maxOppositeQueryName as keyof IFilterState]!
  const maxFilteredItems = maxItems.filter((item) => item.value === 'any' || parseInt(item.value) > parseInt(maxOppositeQueryNameValue.toString()) )

  const handleChange = (queryName: string, value: string) => {
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

  const minMaxValues = [
      {
        title: 'Minimum',
        queryName: minQueryName,
        filteredItems: minFilteredItems,
      },
      {
        title: 'Maximum',
        queryName: maxQueryName,
        filteredItems: maxFilteredItems,
      }
  ];

  const Options = ({items, queryName}: IOptionsProps) => {
      return (
        <>
          { items.map(({name, value}) => (
              <option selected={filterState[queryName as keyof IFilterState] === value} key={name} value={value}> {name} </option>
          )) }
        </>
      )
  }

    return (
      <div className='space-y-2'>
        <h5 className='text-lg'> {heading} </h5>
  
        <div className='flex justify-between w-full gap-2'>
          { minMaxValues.map(({title, queryName, filteredItems}) => (
            <div className='minMaxSort' key={title}>
              <p className="text-sm"> {title} </p>

              <div>              
                    <select className='minMaxSort_select'
                      onChange={(e) => {handleChange(queryName, e.target.value )}}
                    > 
                      <Options items={filteredItems} queryName={queryName} />
                    </select>
              </div>
            </div>
          )) }
        </div>
      </div>
    )
}

export default SelectLayout