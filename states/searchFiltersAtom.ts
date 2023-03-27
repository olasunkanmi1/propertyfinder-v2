import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface IsearchFiltersState {
  main: string | null;
  minMax: string | null;
}

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