import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

export interface addressSuggestionsAtomState {
    address: string;
    predictions: {
        externalID: string;
        name: string;
    }[];
}

const { persistAtom } = recoilPersist({
    key: 'addressSuggestions-persist',
});

export const addressSuggestionsAtom = atom<addressSuggestionsAtomState>({
    key: 'addressSuggestions', 
    default: {
        address: "",
        predictions: []
    },
    effects_UNSTABLE: [persistAtom],
});