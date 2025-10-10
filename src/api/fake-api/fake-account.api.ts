/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { IAddress } from '~/interfaces/address';
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder } from '~/interfaces/order';
import { IUser } from '~/interfaces/user';
import { AccountApi, IEditAddressData, IEditProfileData } from '~/api/base';
import {
    accountChangePassword,
    accountEditProfile,
    accountSignIn,
    accountSignOut,
    accountSignUp,
    addAddress,
    delAddress,
    editAddress,
    getAddress,
    getAddresses,
    getDefaultAddress,
    getOrderById,
    getOrderByOrdId,
    getOrderByToken,
    getOrdersList,
    updateOrderById,
} from '~/fake-server/endpoints';

export class FakeAccountApi extends AccountApi {
    signIn(email: string, password: string): Promise<IUser> {
        return accountSignIn(email, password);
    }

    signUp(name: string, email: string, password: string): Promise<IUser> {
        return accountSignUp(name, email, password);
    }

    signOut(): Promise<void> {
        return accountSignOut();
    }

    editProfile(data: IEditProfileData): Promise<IUser> {
        return accountEditProfile(data);
    }

    changePassword(oldPassword: string, newPassword: string, email: string): Promise<void> {
        return accountChangePassword(oldPassword, newPassword, email);
    }

    addAddress(data: IEditAddressData, userId: string): Promise<IAddress> {
        return addAddress(data, userId);
    }

    editAddress(addressId: number, data: IEditAddressData): Promise<IAddress> {
        return editAddress(addressId, data);
    }

    delAddress(addressId: number): Promise<void> {
        return delAddress(addressId);
    }

    getDefaultAddress(userId: string): Promise<IAddress | null> {
        return getDefaultAddress(userId);
    }

    getAddress(addressId: number): Promise<IAddress> {
        return getAddress(addressId);
    }

    getAddresses(token: string): Promise<IAddress[]> {
        return getAddresses(token);
    }

    getOrdersList(options?: IListOptions & { email: string }): Promise<IOrdersList> {
        return getOrdersList(options);
    }

    getOrderById(id: string | number): Promise<IOrder> {
        return getOrderById(id);
    }

    getOrderByOrderId(id: string | number): Promise<IOrder> {
        return getOrderByOrdId(id);
    }

    updateOrderById(id: string): Promise<void> {
        return updateOrderById(id);
    }

    getOrderByToken(token: string): Promise<IOrder> {
        return getOrderByToken(token);
    }
}
