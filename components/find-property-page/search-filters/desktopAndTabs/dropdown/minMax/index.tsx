import { useRecoilState, useSetRecoilState } from 'recoil';
import Options from './options';
import { filterAtom, loadingState, searchFiltersState } from '@states';
import { IDropdownWithMinMaxProps, IFilterState } from '@types';
import { findProperties, handleDropdown } from '@utils';

const MinMaxDropdown: React.FC<IDropdownWithMinMaxProps> = ({ select, title, minMaxValues }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const {values, minKey, maxKey, minValue, maxValue} = minMaxValues

  const handleButton = (reset: boolean) => {    
    if(reset) {
      setLoading(loading => ({
        ...loading,
        propertiesLoading: true
      }))
      
      setFilterState(filterState => ({
      ...filterState,
        [minKey]: '0',
        [maxKey]: 'any',
      }))
      findProperties({ [minKey]: [],  [maxKey]: [] }, setLoading)
    }

    setDropdown({
      main: null,
      minMax: null,
    })
  }  

  return (
    <div className={`dropdownWrapper top-[68px] w-[200px] min-[986px]:w-full ${select === 'price' ? 'right-0' : 'left-0'}`}>
      <h5 className='dropdownWrapperHeader'> {title} </h5>

      <div className="flex justify-between w-full">
        {values.map(({title, queryName, filteredItems}) => (
          <div key={title} className="flex flex-col w-[45%] text-black space-y-1">
            <div className='z-50'>
                <p className='text-xs font-semibold'> {title} </p>
                <span onClick={() => handleDropdown(title, dropdown, setDropdown, true)} className='flex border relative rounded py-1 px-2 w-full cursor-pointer font-semibold select-none'> 
                    {filterState[queryName as keyof IFilterState]} 

                    {dropdown.minMax === title && ( 
                      <Options items={filteredItems} queryName={queryName} />
                    )}
                </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full">
        { minValue !== '0' || maxValue !== 'any' ? <button className="minMaxFIlter border border-primary text-primary w-[45%]" onClick={() => handleButton(true)}> Reset </button> :  null }
        <button className={`minMaxFIlter bg-primary text-white ${minValue === '0' && maxValue === 'any' ? 'w-full' : 'w-[45%]'}`} onClick={() => handleButton(false)}> Done </button>
      </div>
    </div>
  )
}

export default MinMaxDropdown