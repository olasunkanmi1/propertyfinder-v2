import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { IFilterState } from '@types';

const { persistAtom } = recoilPersist({
    key: 'filter-persist',
})

export const filterAtom = atom<IFilterState>({
    key: 'filterState',
    default: {
        purpose: 'for-rent',
        rentFrequency: 'yearly',
        priceMin: '0',
        priceMax: 'any',
        sort: 'any',
        areaMin: '0',
        areaMax: 'any',
        roomsMin: '0',
        roomsMax: 'any',
        bathsMin: '0',
        bathsMax: 'any',
        furnishingStatus: 'any',
        categoryExternalID: '1',
        locationExternalIDs: 'any',
        
        propertyType: 'Property Type',
        emirates: 'any',
        sortBy: 'any',
        address: '',
    },
    effects_UNSTABLE: [persistAtom],
});