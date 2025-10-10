/* eslint-disable linebreak-style */
/* eslint-disable implicit-arrow-linebreak */
// application
import { accountApi } from '~/api';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';
import { USER_SET_CURRENT, UserSetCurrentAction, UserThunkAction } from '~/store/user/userActionTypes';

export function userSetCurrent(user: IUser | null): UserSetCurrentAction {
    return {
        type: USER_SET_CURRENT,
        payload: user,
    };
}

export function userSignIn(email: string, password: string): UserThunkAction<Promise<void>> {
    return (dispatch) =>
        accountApi.signIn(email, password).then((user) => {
            dispatch(userSetCurrent(user));
        });
}

export function userSignUp(name: string, email: string, password: string): UserThunkAction<Promise<void>> {
    return (dispatch) =>
        accountApi.signUp(name, email, password).then((user) => {
            dispatch(userSetCurrent(user));
        });
}

export function userSignOut(): UserThunkAction<Promise<void>> {
    return (dispatch) =>
        accountApi.signOut().then(() => {
            dispatch(userSetCurrent(null));
        });
}

export function userEditProfile(data: IEditProfileData): UserThunkAction<Promise<void>> {
    return (dispatch) =>
        accountApi.editProfile(data).then((user) => {
            dispatch(userSetCurrent(user));
        });
}
