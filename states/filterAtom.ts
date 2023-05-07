import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { IFilterState } from '../types';

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