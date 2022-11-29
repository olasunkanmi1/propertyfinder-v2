import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export interface IFilterState {
    purpose?: string | string[];
    rentFrequency?: string | string[];
    priceMin?: string | string[];
    priceMax?: string | string[];
    sort?: string | string[];
    areaMin?: string | string[];
    areaMax?: string | string[];
    roomsMin?: string | string[];
    roomsMax?: string | string[];
    bathsMin?: string | string[];
    bathsMax?: string | string[];
    furnishingStatus?: string | string[];
    categoryExternalID?: string | string[];
    locationExternalIDs?: string | string[];

    propertyType?: string;
    emirates?: string;
    sortBy?: string;
}

const { persistAtom } = recoilPersist({
    key: 'filter-persist',
})

export const filterAtom = atom<IFilterState>({
    key: 'filterState',
    default: {
        purpose: 'for-rent',
        rentFrequency: 'any',
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
        emirates: 'Emirates',
        sortBy: 'Sort',
    },
    effects_UNSTABLE: [persistAtom],
});