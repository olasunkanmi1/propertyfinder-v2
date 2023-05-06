import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, IFilterState, loadingState, searchFiltersState } from '../../../../../../states';
import { ICategoryType, IDropdownWithMinMaxProps } from '../../../../../../types';
import Options from './options';
import { findProperties } from '../../../../../../utils/findProperty/findProperties';

const DropdownWithMinMax: React.FC<IDropdownWithMinMaxProps> = ({ select, title, min, max }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const handleDropdown = (dropdownValue: string) => {
    if(dropdown.minMax === dropdownValue) {
      setDropdown( dropdown => ({
        ...dropdown,
        minMax: null
      }))
    } else {
       setDropdown(dropdown => ({
        ...dropdown,
        minMax: dropdownValue
       }))
    }
  }

  const handleButton = (reset: boolean) => {    
    if(reset) {
      setLoading(loading => ({
        ...loading,
        propertiesLoading: true
      }))
      
      setFilterState(filterState => ({
      ...filterState,
        [min.queryName]: '0',
        [max.queryName]: 'any',
      }))
      findProperties({ [min.queryName]: [],  [max.queryName]: [] }, setLoading)
    }

    setDropdown({
      main: null,
      minMax: null,
    })
  }

  return (
    <div className={`space-y-2 absolute top-[59px] rounded p-2 bg-white z-20 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] w-[200px] min-[986px]:w-full ${select === 'price' ? 'right-0' : 'left-0'}`}>
      <h5 className='text-black text-sm font-semibold'> {title} </h5>

      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[45%] text-black space-y-1">
            { min.list?.map((type) => {
                const { items, placeholder, queryName  } = type;
                const oppositeQueryName = filterState[min.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => parseInt(item.value ) < parseInt(oppositeQueryName.toString()) );
                
                return (
                    <div key={placeholder} className='z-50'>
                        <p className='text-xs font-semibold'> Minimum </p>
                        <span onClick={() => handleDropdown('min')} className='flex border relative rounded py-1 px-2   w-full z-50 cursor-pointer font-semibold select-none'> 
                            {filterState[queryName as keyof IFilterState]} 

                            {dropdown.minMax === 'min' && ( 
                                oppositeQueryName !== 'any' ? 
                                <Options items={itemsFilter} queryName={queryName} />
                                : 
                                <Options items={items} queryName={queryName} />
                            )}
                        </span>
                    </div>
                )
            }) }
        </div>

        <div className="flex flex-col w-[45%] text-black space-y-1">
            { max.list?.map((sort) => {
                const { items, placeholder, queryName } = sort;
                const oppositeQueryName = filterState[max.oppositeQueryName as keyof IFilterState]!;

                const itemsFilter = items.filter((item) => item.value === 'any' || parseInt(item.value) > parseInt(oppositeQueryName.toString()))

                return (
                    <>
                        <div key={placeholder}>
                            <p className='text-xs font-semibold'> Maximum </p>

                            <span onClick={() => handleDropdown('max')} className='flex border relative rounded py-1 px-2  w-full cursor-pointer font-semibold select-none'> 
                                {filterState[queryName as keyof IFilterState]} 

                                { dropdown.minMax === 'max' && <Options items={itemsFilter} queryName={queryName} /> }
                            </span>
                        </div>
                    </>
                )
              }) }
        </div>
      </div>

      <div className="flex justify-between w-full">
        { filterState[min.queryName as keyof IFilterState] !== '0' || filterState[max.queryName as keyof IFilterState] !== 'any' ? <button className="minMaxFIlter border border-primary text-primary w-[45%]" onClick={() => handleButton(true)}> Reset </button> :  null }
        <button className={`minMaxFIlter bg-primary text-white ${filterState[min.queryName as keyof IFilterState] === '0' && filterState[max.queryName as keyof IFilterState] === 'any' ? 'w-full' : 'w-[45%]'}`} onClick={() => handleButton(false)}> Done </button>
      </div>
    </div>
  )
}

export default DropdownWithMinMax