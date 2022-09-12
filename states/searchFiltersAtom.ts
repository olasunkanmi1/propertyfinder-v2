import { atom } from 'recoil';

export interface IsearchFiltersState {
  purposeDropdown?: boolean;
  frequencyDropdown?: boolean;
  priceDropdown?: boolean;
  sortDropdown?: boolean;
  areaDropdown?: boolean;
  roomsDropdown?: boolean;
  bathsDropdown?: boolean;
  furnishDropdown?: boolean;
  propertyDropdown?: boolean;
  emiratesDropdown?: boolean;
}

export const searchFiltersState = atom<IsearchFiltersState>({
  key: 'searchFiltersState', 
  default: {
    purposeDropdown: false,
    frequencyDropdown: false,
    priceDropdown: false,
    sortDropdown: false,
    areaDropdown: false,
    roomsDropdown: false,
    bathsDropdown: false,
    furnishDropdown: false,
    propertyDropdown: false,
    emiratesDropdown: false,
  },
});