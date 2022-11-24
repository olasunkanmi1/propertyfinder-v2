import { filterData } from '../../../../utils/filterData';
import { AiOutlineDown } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { searchFiltersState } from '../../../../states/searchFiltersAtom';
import Dropdown from './dropdown';
import Purpose from './purpose';

const DesktopAndTabs = () => {
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const dropdownNames = {
    purpose: 'purpose',
    rooms: 'rooms',
    baths: 'baths',
    area: 'area',
    price: 'price',
    propertyType: 'propertyType',
    furnishingStatus: 'furnishingStatus',
    emirates: 'emirates',
    completionStatus: 'completionStatus',
   };

  const showOptions = (option: any) => {
    // setDropdown({
    //     [!option]: false,
    //     [option]: !dropdown[option]
    // });
  }
  
  // const showDropdown = (option: any) => {
  //   setDropdown({
  //       [!option]: false,
  //       [option]: !dropdown[option]
  //   });
  // }

  const handleDropdown = (dropdownValue: string) => {
    if(dropdown === dropdownValue) {
      setDropdown(null)
    } else {
      setDropdown(dropdownValue)
    }
  }

  return (
    <div className="hidden md:flex flex-col justify-between items-center bg-dubai bg-contain w-full space-y-8 rounded-3xl text-white p-4">
        <h1 className="text-3xl font-bold w-fit text-center"> Search Properties for sale and to rent in the UAE </h1>

        <div className="grid grid-cols-4 gap-5 justify-center p-4 w-full lg:w-[900px] rounded-xl bg-[#000] bg-opacity-60 mx-auto">
            <Purpose handleDropdown={handleDropdown} />
        </div>
    </div>
  )
}

export default DesktopAndTabs