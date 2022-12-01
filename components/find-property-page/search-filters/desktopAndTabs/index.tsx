import { filterData } from '../../../../utils/filterData';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { searchFiltersState } from '../../../../states/searchFiltersAtom';
import Searchbox from '../searchbox';
import MinMaxLayout from './min-max-layout';
import DirectDropdownLayout from './direct-dropdown-layout';
import ToggleLayout from './toggle-layout';
import { addressSuggestionsAtom, filterAtom } from '../../../../states';
import { useRouter } from 'next/router';
import { ISearchFiltersProps } from '..';

const DesktopAndTabs: React.FC<ISearchFiltersProps> = ({filterRef, suggestionsRef}) => {
  const router = useRouter();
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);
  const resetFilterState = useResetRecoilState(filterAtom);
  const resetSuggestions = useResetRecoilState(addressSuggestionsAtom);

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
  const resetFilters = () => {
    resetFilterState();
    resetSuggestions();
    setDropdown({
      main: null,
      minMax: null,
    })
    router.push('/find-property')
  }

  const purposes = filterData.filter((filter) => filter.placeholder === 'Purpose');
  const propertyTypes = filterData.filter((filter) => filter.placeholder === 'Property Type');
  const rooms = filterData.filter((filter) => filter.placeholder === 'Rooms');
  const baths = filterData.filter((filter) => filter.placeholder === 'Baths');
  const area = filterData.filter((filter) => filter.placeholder === 'Area (sqft)');
  const price = filterData.filter((filter) => filter.placeholder === 'Price(AED)');
  const emirates = filterData.filter((filter) => filter.placeholder === 'Emirates');
  const furnishingStatus = filterData.filter((filter) => filter.placeholder === 'Furnishing Status');
  const sort = filterData.filter((filter) => filter.placeholder === 'Sort');

  const roomsMin = {
    list: rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Min'),
    queryName: 'roomsMin',
    oppositeQueryName: 'roomsMax',
  };
  
  const roomsMax = {
    list: rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Max'),
    queryName: 'roomsMax',
    oppositeQueryName: 'roomsMin',
  };

  const bathsMin = {
    list: baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Min'),
    queryName: 'bathsMin',
    oppositeQueryName: 'bathsMax',
  };
  
  const bathsMax = {
    list: baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Max'),
    queryName: 'bathsMax',
    oppositeQueryName: 'bathsMin',
  };

  const areaMin = {
    list: area[0].categories?.filter((filter) => filter.placeholder === 'Min Area (sqft)'),
    queryName: 'areaMin',
    oppositeQueryName: 'areaMax',
  };
  
  const areaMax = {
    list: area[0].categories?.filter((filter) => filter.placeholder === 'Max Area (sqft)'),
    queryName: 'areaMax',
    oppositeQueryName: 'areaMin',
  };

  const priceMin = {
    list: price[0].categories?.filter((filter) => filter.placeholder === 'Min Price(AED)'),
    queryName: 'priceMin',
    oppositeQueryName: 'priceMax',
  };
  
  const priceMax = {
    list: price[0].categories?.filter((filter) => filter.placeholder === 'Max Price(AED)'),
    queryName: 'priceMax',
    oppositeQueryName: 'priceMin',
  };

  return (
    <div className="hidden md:flex flex-col justify-between items-center bg-dubai bg-contain w-full space-y-8 rounded-3xl text-white p-4">
        <h1 className="text-3xl font-bold w-fit text-center"> Search Properties for sale and to rent in the UAE </h1>

        <div className="grid grid-cols-4 gap-5 justify-center p-4 w-full lg:w-[900px] rounded-xl bg-[#000] bg-opacity-60 mx-auto" ref={filterRef}>
          <ToggleLayout handleDropdown={handleDropdown} selected='purpose' array={purposes} />
          <Searchbox desktop suggestionsRef={suggestionsRef} />
          <ToggleLayout handleDropdown={handleDropdown} selected='property-type' array={propertyTypes} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='rooms' array={rooms} min={roomsMin} max={roomsMax} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='baths' array={baths} min={bathsMin} max={bathsMax} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='area' array={area} min={areaMin} max={areaMax} />
          <MinMaxLayout handleDropdown={handleDropdown} selected='price' array={price} min={priceMin} max={priceMax} />
          <DirectDropdownLayout handleDropdown={handleDropdown} selected='emirates' array={emirates} />
          <DirectDropdownLayout handleDropdown={handleDropdown} selected='furnishingStatus' array={furnishingStatus} />
          <DirectDropdownLayout handleDropdown={handleDropdown} selected='sort' array={sort} />
          <button onClick={resetFilters} className='bg-secondary rounded-md font-semibold'> Reset all </button>
        </div>
    </div>
  )
}

export default DesktopAndTabs