import { AiOutlineUp } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { filterAtom, searchFiltersState } from '../../../../states';
import { IDirectDropdownLayoutProps } from '../../../../types'
import DirectDropdown from './dropdown/direct';

const DirectDropdownLayout: React.FC<IDirectDropdownLayoutProps> = ({handleDropdown, selected, array}) => {
  const dropdown = useRecoilValue(searchFiltersState);
  const filterState = useRecoilValue(filterAtom);

  return (
    <>
        { array.map((select) => {
            const { items, placeholder, queryName } = select;

            return (
              <div key={placeholder} className='relative'>
                <div className='flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-semibold cursor-pointer'
                    onClick={() => handleDropdown(selected)}
                >
                  { selected === 'emirates' ? (
                    <p className='filterSelect max-w-[calc(100%-20px)]'> { filterState.emirates } </p>
                    ) : selected === 'furnishingStatus' ? (
                      <p className='filterSelect max-w-[calc(100%-20px)]'> { filterState.furnishingStatus === 'any' ? 'Furnishing Status' : filterState.furnishingStatus === 'furnished' ? 'Furnished' : 'Unfurnished'} </p>
                  ) : (
                      <p className='filterSelect max-w-[calc(100%-20px)]'> { filterState.sortBy } </p>
                  ) }
                  <AiOutlineUp className={`transition-all duration-300 ${dropdown.main === selected ? '' : '-rotate-180'}`} />
                </div>
                { dropdown.main === selected && <div className='tooltip' /> }

                {dropdown.main === selected && <DirectDropdown select={selected} title={placeholder} options={items} queryName={queryName} /> } 
              </div>
            )

        }) }
    </>
  )
}

export default DirectDropdownLayout