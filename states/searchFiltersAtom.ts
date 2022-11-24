import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

const { persistAtom } = recoilPersist({
  key: 'search-filter-persist',
})

export const searchFiltersState = atom<string | null>({
  key: 'searchFiltersState', 
  default: null
  // effects_UNSTABLE: [persistAtom],
});