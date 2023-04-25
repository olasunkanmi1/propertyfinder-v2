import { ISelectLayoutProps } from '../../../../../types';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { filterAtom, IFilterState, loadingState } from '../../../../../states';
import { findProperties } from '../..';

interface IOptionsProps {
  items: {
    name: string;
    value: string;
  }[], 
  queryName: string
}

const SelectLayout: React.FC<ISelectLayoutProps> = ({heading, min, max}) => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const setLoading = useSetRecoilState(loadingState);

  const handleChange = (queryName: string, value: string) => {
    setFilterState(filterState => ({
      ...filterState,
      [queryName]: value,
    }))

    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

     findProperties({ [queryName]: value })
  }

  const Options = ({items, queryName}: IOptionsProps) => {
      return (
        <>
          { items.map((item) => {
            const { name, value  } = item;

            return (
              <option selected={filterState[queryName as keyof IFilterState] === value} key={name} value={value}> {name} </option>
            )
          }) }
        </>
      )
  }

    return (
      <div className='space-y-2'>
        <h5 className='text-lg'> {heading} </h5>
  
        <div className='flex justify-between w-full gap-2'>
          <div className='minMaxSort'>
            <p className="text-sm"> Minimum </p>

            <div>
              { min.list?.map((type) => {
                const { items, placeholder, queryName  } = type;
                const oppositeQueryName = filterState[min.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => parseInt(item.value ) < parseInt(oppositeQueryName.toString()) );
                
                return (
                  <select key={placeholder} className='minMaxSort_select'
                  onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                    { oppositeQueryName !== 'any' ? 
                        <Options items={itemsFilter} queryName={queryName} />
                        : 
                        <Options items={items} queryName={queryName} />
                    }
                  </select>
                )
              }) }
            </div>
          </div>
          
          <div className='minMaxSort'>  
            <p className="text-sm"> Maximum </p>

            <div>
              { max.list?.map((sort) => {
                const { items, placeholder, queryName } = sort;
                const oppositeQueryName = filterState[max.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => item.value === 'any' || parseInt(item.value) > parseInt(oppositeQueryName.toString()))

                return (
                  <select key={placeholder} className='minMaxSort_select'
                    onChange={(e) => {handleChange(queryName, e.target.value )}}
                  > 
                        <Options items={itemsFilter} queryName={queryName} />
                  </select>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    )
}

export default SelectLayout