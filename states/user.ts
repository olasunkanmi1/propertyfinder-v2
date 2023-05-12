import { atom } from 'recoil'
import { IUserState } from '@types';

export const userState = atom<IUserState | null>({
    key: 'userAtom',
    default: null,
});