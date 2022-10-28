import { filterData } from '../../../utils/filterData';
import { AiOutlineDown } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { searchFiltersState } from '../../../states/searchFiltersAtom';
import Dropdown from './dropdown';

const SearchFilters = () => {
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);

//   const showOptions = (option: any) => {
//     setDropdown({
//         [!option]: false,
//         [option]: !dropdown[option]
//     });
//   }

  return (
    <div className="flex flex-col justify-between items-center bg-dubai bg-contain w-full space-y-8 rounded-3xl text-white p-4">
        <h1 className="text-3xl font-bold w-fit"> Search Properties for sale and to rent in the UAE </h1>

        <div className="grid grid-cols-4 gap-4 p-4 w-[900px] rounded-xl bg-[#000] bg-opacity-60 mx-auto">
            {filterData.map((filter) => {
                const option = filter.dropdown

                return (
                    <div 
                        key={filter.placeholder} 
                        className="flex items-center justify-between bg-white rounded-md text-gray-600 py-2 px-4 text-md font-medium cursor-pointer relative"
                        // onClick={() => showOptions(filter.dropdown)}
                    >
                        <p className='select-none'> { filter.placeholder } </p>
                        {/* <AiOutlineDown className={`transition duration-200 ${dropdown[option] ? 'rotate-180' : ''} `} /> */}

                        <Dropdown dropdown={dropdown} option={option} filter={filter} />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default SearchFilters