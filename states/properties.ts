import { atom } from 'recoil'
import { IPropertiesState } from '@types';

export const propertiesState = atom<IPropertiesState>({
    key: 'propertiesAtom',
    default: {
        featuredProperties: [],
        savedProperties: [],
        properties:[],
        ptyWaitLoading: false,
    },
});