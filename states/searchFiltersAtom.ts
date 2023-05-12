import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IsearchFiltersState } from '@types';

const { persistAtom } = recoilPersist({
  key: 'search-filter-persist',
})

export const searchFiltersState = atom<IsearchFiltersState>({
  key: 'searchFiltersAtom', 
  default: {
    main: null,
    minMax: null
  }
  // effects_UNSTABLE: [persistAtom],
});