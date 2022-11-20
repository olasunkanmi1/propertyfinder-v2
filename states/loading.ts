import { atom } from 'recoil'

export const loadingState = atom({
    key: 'dropdownState',
    default: {
        routeChangeLoading: false,
        propertiesLoading: false
    }
});