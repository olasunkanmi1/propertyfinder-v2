import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export interface IFilterState {
    purpose?: string | string[];
    frequency?: string;
    priceMin?: string;
    priceMax?: string;
    sort?: string;
    areaMin?: string;
    areaMax?: string;
    roomsMin?: string;
    roomsMax?: string;
    bathsMin?: string;
    bathsMax?: string;
    furnishingStatus?: string;
    categoryExternalID?: string;
    locationExternalIDs?: string;
    propertyType?: string;
}

const { persistAtom } = recoilPersist({
    key: 'filter-persist',
})

export const filterAtom = atom<IFilterState>({
    key: 'filterState',
    default: {
        purpose: '',
        frequency: 'yearly',
        priceMin: '0',
        priceMax: 'any',
        sort: 'popular',
        areaMin: '0',
        areaMax: 'any',
        roomsMin: '0',
        roomsMax: 'any',
        bathsMin: '0',
        bathsMax: 'any',
        furnishingStatus: 'any',
        categoryExternalID: '1',
        locationExternalIDs: '5001',
        
        propertyType: 'Property Type',
        // propertyType: 'Property Type',
    },
    effects_UNSTABLE: [persistAtom],
});