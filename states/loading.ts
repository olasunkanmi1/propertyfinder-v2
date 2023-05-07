import { atom } from 'recoil'
import { ILoadingState } from '../types';

export const loadingState = atom<ILoadingState>({
    key: 'loadingAtom',
    default: {
        routeChangeLoading: false,
        propertiesLoading: true,
        userLoading: true
    }
});