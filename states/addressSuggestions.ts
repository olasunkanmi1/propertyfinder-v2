import { atom } from 'recoil';
import { addressSuggestionsAtomState } from '@types';

export const addressSuggestionsAtom = atom<addressSuggestionsAtomState[] | null>({
    key: 'addressSuggestions', 
    default: null,
});