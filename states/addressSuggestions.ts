import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";
import { addressSuggestionsAtomState } from '../types';

const { persistAtom } = recoilPersist({
    key: 'addressSuggestions-persist',
});

export const addressSuggestionsAtom = atom<addressSuggestionsAtomState>({
    key: 'addressSuggestions', 
    default: {
        address: "",
        predictions: null
    },
    // effects_UNSTABLE: [persistAtom],
});