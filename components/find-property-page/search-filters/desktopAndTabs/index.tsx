import { filterData } from '../../../../utils/filterData';
import { useRecoilState } from 'recoil';
import { searchFiltersState } from '../../../../states/searchFiltersAtom';
import Purpose from './purpose';
import Searchbox from '../searchbox';
import PropertyType from './property-type';
import MinMaxLayout from './min-max-layout';
import DirectDropdownLayout from './direct-dropdown-layout';

export interface IChildProps {
  handleDropdown: (dropdownValue: string) => void;
}

const DesktopAndTabs = () => {
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const handleDropdown = (dropdownValue: string) => {
    if(dropdown.main === dropdownValue) {
      setDropdown({
        main: null,
        minMax: null,
      })
    } else {
      setDropdown({
        main: dropdownValue,
        minMax: null,
      })
    }
  }

  const rooms = filterData.filter((filter) => filter.placeholder === 'Rooms');
  const baths = filterData.filter((filter) => filter.placeholder === 'Baths');
  const area = filterData.filter((filter) => filter.placeholder === 'Area (sqft)');
  const price = filterData.filter((filter) => filter.placeholder === 'Price(AED)');
  const emirates = filterData.filter((filter) => filter.placeholder === 'Emirates');
  const furnishingStatus = filterData.filter((filter) => filter.placeholder === 'Furnishing Status');
  const sort = filterData.filter((filter) => filter.placeholder === 'Sort');

  const roomsMin = {
    list: rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Min'),
    oppositeQueryName: 'roomsMax',
  };
  
  const roomsMax = {
    list: rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Max'),
    oppositeQueryName: 'roomsMin',
  };

  const bathsMin = {
    list: baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Min'),
    oppositeQueryName: 'bathsMax',
  };
  
  const bathsMax = {
    list: baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Max'),
    oppositeQueryName: 'bathsMin',
  };

  const areaMin = {
    list: area[0].categories?.filter((filter) => filter.placeholder === 'Min Area (sqft)'),
    oppositeQueryName: 'areaMax',
  };
  
  const areaMax = {
    list: area[0].categories?.filter((filter) => filter.placeholder === 'Max Area (sqft)'),
    oppositeQueryName: 'areaMin',
  };

  const priceMin = {
    list: price[0].categories?.filter((filter) => filter.placeholder === 'Min Price(AED)'),
    oppositeQueryName: 'priceMax',
  };
  
  const priceMax = {
    list: price[0].categories?.filter((filter) => filter.placeholder === 'Max Price(AED)'),
    oppositeQueryName: 'priceMin',
  };

  return (
    <div className="hidden md:flex flex-col justify-between items-center bg-dubai bg-contain w-full space-y-8 rounded-3xl text-white p-4">
        <h1 className="text-3xl font-bold w-fit text-center"> Search Properties for sale and to rent in the UAE </h1>

        <div className="grid grid-cols-4 gap-5 justify-center p-4 w-full lg:w-[900px] rounded-xl bg-[#000] bg-opacity-60 mx-auto z-[50]">
          <Purpose handleDropdown={handleDropdown} />
          <Searchbox desktop />
          <PropertyType handleDropdown={handleDropdown} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='rooms' array={rooms} min={roomsMin} max={roomsMax} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='baths' array={baths} min={bathsMin} max={bathsMax} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='area' array={area} min={areaMin} max={areaMax} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='price' array={price} min={priceMin} max={priceMax} />
          <DirectDropdownLayout handleDropdown={handleDropdown} selected='emirates' array={emirates} />
          <DirectDropdownLayout handleDropdown={handleDropdown} selected='furnishingStatus' array={furnishingStatus} />
          <DirectDropdownLayout handleDropdown={handleDropdown} selected='sort' array={sort} />
        </div>
    </div>
  )
}

export default DesktopAndTabs