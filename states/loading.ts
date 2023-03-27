import { atom } from 'recoil'

export interface ILoadingState {
    routeChangeLoading: boolean;
    propertiesLoading: boolean;
    userLoading: boolean;
};

export const loadingState = atom<ILoadingState>({
    key: 'loadingAtom',
    default: {
        routeChangeLoading: false,
        propertiesLoading: false,
        userLoading: true
    }
});