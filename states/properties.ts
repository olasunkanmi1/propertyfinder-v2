import { atom } from 'recoil'
import { Property } from '../types';

export interface IPropertiesState {
    featuredProperties?: Property[],
    savedProperties?: Property[] | null,
    properties?: Property[],
}

export const propertiesState = atom<IPropertiesState>({
    key: 'propertiesAtom',
    default: {
        featuredProperties: [],
        savedProperties: [],
        properties:[]
    },
});