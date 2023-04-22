import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

export interface addressSuggestionsAtomState {
    address: string;
    predictions: {
        externalID: string;
        name: string;
    }[] | null;
}

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