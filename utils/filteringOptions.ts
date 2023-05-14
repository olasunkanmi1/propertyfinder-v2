import { IFilterOptionsWithMinMax, IFilterValues, ISelections, MinMaxSelections } from "@types";

const filterOptions = [
  // Purpose
  {
    items: [
      { name: 'Buy', value: 'for-sale' },
      { name: 'Rent', value: 'for-rent' },
    ],
    placeholder: 'Purpose',
    queryName: 'purpose',
  },
  // Rent Frequency
  {
    items: [
      { name: 'Yearly', value: 'yearly' },
      { name: 'Monthly', value: 'monthly' },
      { name: 'Weekly', value: 'weekly' },
      { name: 'Daily', value: 'daily' },
    ],
    placeholder: 'Rent Frequency',
    queryName: 'rentFrequency',
  },
  // Sort
  {
    items: [
      { name: 'Any', value: 'any' },
      { name: 'Newest', value: 'date-desc' },
      { name: 'Lowest Price', value: 'price-asc' },
      { name: 'Highest Price', value: 'price-desc' },
      { name: 'Verified', value: 'verified-score' },
    ],
    placeholder: 'Sort',
    queryName: 'sort',
  },
  // Furnishing Status
  {
    items: [
      { name: 'Any', value: 'any' },
      { name: 'Furnished', value: 'furnished' },
      { name: 'Unfurnished', value: 'unfurnished' },
    ],
    placeholder: 'Furnishing Status',
    queryName: 'furnishingStatus',
  },
  // Property Type
  {
    categories: [
      // Residential
      {
        items: [
          { name: 'Apartment', value: '4', icon: 'MdApartment' },
          { name: 'Townhouse', value: '16', icon: 'MdHolidayVillage' },
          { name: 'Villa', value: '3', icon: 'MdVilla' },
          { name: 'Penthouse', value: '18', icon: 'TbBuilding' },
          { name: 'Hotel Apartment', value: '21', icon: 'FaHotel' },
          { name: 'Villa Compound', value: '19', icon: 'MdHomeWork' },
          { name: 'Residential Plot', value: '14', icon: 'MdApartment' },
          { name: 'Residential Floor', value: '12', icon: 'MdApartment' },
          { name: 'Residential Building', value: '17', icon: 'MdOtherHouses' },
        ],
        placeholder: 'Residential',
        queryName: 'categoryExternalID',
      },
      // Commercial
      {
        items: [
          { name: 'Office', value: '5', icon: 'ImOffice' },
          { name: 'Shop', value: '6', icon: 'IoStorefront' },
          { name: 'Warehouse', value: '7', icon: 'FaWarehouse' },
          { name: 'Labour camp', value: '9', icon: 'ImHome2' },
          { name: 'Commercial Villa', value: '25', icon: 'TbBuildingBank' },
          { name: 'Bulk Units', value: '20', icon: 'MdOutlineHome' },
          { name: 'Commercial Plot', value: '15', icon: 'MdApartment' },
          { name: 'Commercial Floor', value: '13', icon: 'MdApartment' },
          { name: 'Commercial Building', value: '10', icon: 'TbBuildingSkyscraper' },
          { name: 'Factory', value: '8', icon: 'GiFactory' },
          { name: 'Industrial Land', value: '22', icon: 'TbBuildingFactory' },
          { name: 'Mixed Use Land', value: '23', icon: 'MdLandscape' },
          { name: 'Showroom', value: '24', icon: 'SiHomeassistantcommunitystore' },
          { name: 'Other Commercial', value: '11', icon: 'MdOtherHouses' },
        ],
        placeholder: 'Commercial',
        queryName: 'categoryExternalID',
      }
    ],
    placeholder: 'Property Type',
    queryName: 'categoryExternalID',
  },
  // Emirates
  {
    items: [
      { name: 'Any', value: 'any' },
      { name: 'Abu Dhabi', value: '6020' },
      { name: 'Ajman', value: '5385' },
      { name: 'Dubai', value: '5002' },
      { name: 'Fujairah', value: '6542' },
      { name: 'Ras Al Khaimah', value: '5509' },
      { name: 'Sharjah', value: '5351' },
      { name: 'Umm Al Quwain', value: '5544' },
    ],
    placeholder: 'Emirates',
    queryName: 'locationExternalIDs',
  },
]; 

const filterOptionsWithMinMax: IFilterOptionsWithMinMax[] = [
  // price
  {
    categories: [
      // Min Price(AED)
      {
        items: [ 
          { name: '0', value: '0' },
          { name: '10,000', value: '10000' },
          { name: '25,000', value: '25000' },
          { name: '50,000', value: '50000' },
          { name: '75,000', value: '75000' },
          { name: '100,000', value: '100000' },
          { name: '150,000', value: '150000' },
          { name: '200,000', value: '200000' },
          { name: '250,000', value: '250000' },
          { name: '300,000', value: '300000' },
          { name: '350,000', value: '350000' },
          { name: '400,000', value: '400000' },
          { name: '450,000', value: '450000' },
          { name: '500,000', value: '500000' },
          { name: '600,000', value: '600000' },
          { name: '700,000', value: '700000' },
          { name: '800,000', value: '800000' },
          { name: '900,000', value: '900000' },
          { name: '1,000,000', value: '1000000' },
          { name: '2,000,000', value: '2000000' },
          { name: '3,000,000', value: '3000000' },
          { name: '4,000,000', value: '4000000' },
          { name: '5,000,000', value: '5000000' },
        ],
        placeholder: 'Min Price(AED)',
        queryName: 'priceMin',
        oppositeQueryName: 'priceMax',
      },
      // Max Price(AED)
      {
        items: [
          { name: 'Any', value: 'any' },
          { name: '50,000', value: '50000' },
          { name: '100,000', value: '100000' },
          { name: '150,000', value: '150000' },
          { name: '200,000', value: '200000' },
          { name: '250,000', value: '250000' },
          { name: '300,000', value: '300000' },
          { name: '350,000', value: '350000' },
          { name: '400,000', value: '400000' },
          { name: '450,000', value: '450000' },
          { name: '500,000', value: '500000' },
          { name: '600,000', value: '600000' },
          { name: '700,000', value: '700000' },
          { name: '800,000', value: '800000' },
          { name: '900,000', value: '900000' },
          { name: '1,000,000', value: '1000000' },
          { name: '2,000,000', value: '2000000' },
          { name: '3,000,000', value: '3000000' },
          { name: '4,000,000', value: '4000000' },
          { name: '5,000,000', value: '5000000' },
        ],
        placeholder: 'Max Price(AED)',
        queryName: 'priceMax',
        oppositeQueryName: 'priceMin',
      },
    ],
    placeholder: 'Price (AED)',
  },
  // Area (sqft)
  {
    categories: [
      // Min Area(sqft)
      {
        items: [
          { name: '0', value: '0' },
          { name: '500', value: '500' },
          { name: '1,000', value: '1000' },
          { name: '1,500', value: '1500' },
          { name: '2,000', value: '2000' },
          { name: '2,500', value: '2500' },
          { name: '3,000', value: '3000' },
          { name: '3,500', value: '3500' },
          { name: '4,000', value: '4000' },
          { name: '4,500', value: '4500' },
          { name: '5,000', value: '5000' },
          { name: '6,000', value: '6000' },
          { name: '7,000', value: '7000' },
          { name: '8,000', value: '8000' },
          { name: '9,000', value: '9000' },
          { name: '10,000', value: '10000' },
          { name: '20000', value: '20000' },
          { name: '30,000', value: '30000' },
          { name: '40,000', value: '40000' },
          { name: '50,000', value: '50000' },
          { name: '100,000', value: '100000' },
        ],
        placeholder: 'Min Area (sqft)',
        queryName: 'areaMin',
        oppositeQueryName: 'areaMax',
      },
      // Max Area(sqft)
      {
        items: [
          { name: 'Any', value: 'any' },
          { name: '500', value: '500' },
          { name: '1,000', value: '1000' },
          { name: '1,500', value: '1500' },
          { name: '2,000', value: '2000' },
          { name: '2,500', value: '2500' },
          { name: '3,000', value: '3000' },
          { name: '3,500', value: '3500' },
          { name: '4,000', value: '4000' },
          { name: '4,500', value: '4500' },
          { name: '5,000', value: '5000' },
          { name: '6,000', value: '6000' },
          { name: '7,000', value: '7000' },
          { name: '8,000', value: '8000' },
          { name: '9,000', value: '9000' },
          { name: '10,000', value: '10000' },
          { name: '20000', value: '20000' },
          { name: '30,000', value: '30000' },
          { name: '40,000', value: '40000' },
          { name: '50,000', value: '50000' },
          { name: '100,000', value: '100000' },
        ],
        placeholder: 'Max Area (sqft)',
        queryName: 'areaMax',
        oppositeQueryName: 'areaMin',
      },
    ],
    placeholder: 'Area (sqft)',
  },
  // Rooms
  {
    categories: [
      // Rooms Min
      {
        items: [
          { name: '0', value: '0' },
          { name: '1', value: '1' },
          { name: '2', value: '2' },
          { name: '3', value: '3' },
          { name: '4', value: '4' },
          { name: '5', value: '5' },
          { name: '6', value: '6' },
          { name: '7', value: '7' },
          { name: '8', value: '8' },
          { name: '9', value: '9' },
          { name: '10', value: '10' },
        ],
        placeholder: 'Rooms Min',
        queryName: 'roomsMin',
        oppositeQueryName: 'roomsMax'
      },
      // Rooms Max
      {
        items: [
          { name: 'Any', value: 'any' },
          { name: '1', value: '1' },
          { name: '2', value: '2' },
          { name: '3', value: '3' },
          { name: '4', value: '4' },
          { name: '5', value: '5' },
          { name: '6', value: '6' },
          { name: '7', value: '7' },
          { name: '8', value: '8' },
          { name: '9', value: '9' },
          { name: '10', value: '10' },
        ],
        placeholder: 'Rooms Max',
        queryName: 'roomsMax',
        oppositeQueryName: 'roomsMin'
      },
    ],
    placeholder: 'Rooms',
  },
  // Baths
  {
    categories: [
      // Baths Min
      {
        items: [
          { name: '0', value: '0' },
          { name: '1', value: '1' },
          { name: '2', value: '2' },
          { name: '3', value: '3' },
          { name: '4', value: '4' },
          { name: '5', value: '5' },
          { name: '6', value: '6' },
          { name: '7', value: '7' },
          { name: '8', value: '8' },
          { name: '9', value: '9' },
          { name: '10', value: '10' },
        ],
        placeholder: 'Baths Min',
        queryName: 'bathsMin',
        oppositeQueryName: 'bathsMax',
      },
      // Baths Max
      {
        items: [
          { name: 'Any', value: 'any' },
          { name: '1', value: '1' },
          { name: '2', value: '2' },
          { name: '3', value: '3' },
          { name: '4', value: '4' },
          { name: '5', value: '5' },
          { name: '6', value: '6' },
          { name: '7', value: '7' },
          { name: '8', value: '8' },
          { name: '9', value: '9' },
          { name: '10', value: '10' },
        ],
        placeholder: 'Baths Max',
        queryName: 'bathsMax',
        oppositeQueryName: 'bathsMin',
      },
    ],
    placeholder: 'Baths',
  },
]
  
export const getFilterValues = (filterValues: IFilterValues) => {
  const {
    purpose,
    rentFrequency,
    priceMin,
    priceMax,
    sort,
    areaMin,
    areaMax,
    roomsMin,
    roomsMax,
    bathsMin,
    bathsMax,
    furnishingStatus,
    categoryExternalID,
    locationExternalIDs,
  } = filterValues;
  
  const values = [
    {
      name: 'purpose',
      value: purpose,
    },
    {
      name: 'rentFrequency',
      value: rentFrequency,
    },
    {
      name: 'priceMin',
      value: priceMin,
    },
    {
      name: 'priceMax',
      value: priceMax,
    },
    {
      name: 'sort',
      value: sort,
    },
    {
      name: 'areaMin',
      value: areaMin,
    },
    {
      name: 'areaMax',
      value: areaMax,
    },
    {
      name: 'roomsMin',
      value: roomsMin,
    },
    {
      name: 'roomsMax',
      value: roomsMax,
    },
    {
      name: 'bathsMin',
      value: bathsMin,
    },
    {
      name: 'bathsMax',
      value: bathsMax,
    },
    {
      name: 'furnishingStatus',
      value: furnishingStatus,
    },
    {
      name: 'categoryExternalID',
      value: categoryExternalID,
    },
    {
      name: 'locationExternalIDs',
      value: locationExternalIDs,
    },
  ];

  return values;
};

const findObjectByPlaceholder  = (placeholder: string) => filterOptions.find((filter) => filter.placeholder === placeholder)!
const findObjectWithMinMaxByPlaceholder = (placeholder: string) => filterOptionsWithMinMax.find((filter) => filter.placeholder === placeholder)!
export const selections: ISelections = {
  purposes: findObjectByPlaceholder ('Purpose'),
  rentFrequency: findObjectByPlaceholder ('Rent Frequency'),
  propertyTypes: findObjectByPlaceholder ('Property Type'),
  rooms: findObjectWithMinMaxByPlaceholder('Rooms'),
  baths: findObjectWithMinMaxByPlaceholder('Baths'),
  area: findObjectWithMinMaxByPlaceholder('Area (sqft)'),
  price: findObjectWithMinMaxByPlaceholder('Price (AED)'),
  emirates: findObjectByPlaceholder ('Emirates'),
  furnishingStatus: findObjectByPlaceholder ('Furnishing Status'),
  sort: findObjectByPlaceholder ('Sort'),
}

export const propertyTypeSelections = {
  residentialProperty: selections.propertyTypes.categories?.find((category) => category.placeholder === 'Residential')!,
  commercialProperty: selections.propertyTypes.categories?.find((category) => category.placeholder === 'Commercial')!,
}

export const propertyTypeSelectionsIDs = {
  residentialPropertyIDs: [...propertyTypeSelections.residentialProperty.items.map(item => item.value), '1'],
  commercialPropertyIDs: propertyTypeSelections.commercialProperty.items.map(item => item.value)
}

const findCategoryByPlaceholder = (option: MinMaxSelections, placeholder: string) =>  option.categories.find((category) => category.placeholder === placeholder)!

// for search filters
const withMinMax = {
  roomsMin: findCategoryByPlaceholder(selections.rooms, 'Rooms Min'),
  roomsMax: findCategoryByPlaceholder(selections.rooms, 'Rooms Max'),
  bathsMin: findCategoryByPlaceholder(selections.baths, 'Baths Min'),
  bathsMax: findCategoryByPlaceholder(selections.baths, 'Baths Max'),
  areaMin: findCategoryByPlaceholder(selections.area, 'Min Area (sqft)'),
  areaMax: findCategoryByPlaceholder(selections.area, 'Max Area (sqft)'),
  priceMin: findCategoryByPlaceholder(selections.price, 'Min Price(AED)'),
  priceMax: findCategoryByPlaceholder(selections.price, 'Max Price(AED)'),
}

const filterWithMinMax = () => {
  const {roomsMin, roomsMax, bathsMin, bathsMax, areaMin, areaMax, priceMin, priceMax} = withMinMax;

  return {
    rooms: {
      roomsMin,
      roomsMax
    },
  
    baths: {
      bathsMin,
      bathsMax
    },
  
    area: {
      areaMin,
      areaMax
    },
  
    price: {
      priceMin,
      priceMax
    }
  }
}

const {rooms, baths, area, price} = filterWithMinMax();

export const toggleLayoutArray = [
  {
    selected: 'purpose',
    options: selections.purposes,
  },
  {
    selected: 'propertyType',
    options: selections.propertyTypes,
  },
]

export const minMaxLayoutArray = [
  {
    selected: 'rooms',
    placeholder: selections.rooms.placeholder,
    min: rooms.roomsMin,
    max: rooms.roomsMax,
  },
  {
    selected: 'baths',
    placeholder: selections.baths.placeholder,
    min: baths.bathsMin,
    max: baths.bathsMax,
  },
  {
    selected: 'area',
    placeholder: selections.area.placeholder,
    min: area.areaMin,
    max: area.areaMax,
  },
  {
    selected: 'price',
    placeholder: selections.price.placeholder,
    min: price.priceMin,
    max: price.priceMax,
  },
]

export const directLayoutArray = [
  {
    selected: 'emirates',
    options: selections.emirates,
  },
  {
    selected: 'furnishingStatus',
    options: selections.furnishingStatus,  
  },
  {
    selected: 'sortBy',
    options: selections.sort,
  },
]