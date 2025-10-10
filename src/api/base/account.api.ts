/* eslint-disable linebreak-style */
// application
import { IAddress, IAddressData } from '~/interfaces/address';
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder } from '~/interfaces/order';
import { IUser } from '~/interfaces/user';

export interface IEditProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IEditAddressData extends IAddressData {
    default: boolean;
}

export abstract class AccountApi {
    abstract signIn(email: string, password: string): Promise<IUser>;

    abstract signUp(name: string, email: string, password: string): Promise<IUser>;

    abstract signOut(): Promise<void>;

    abstract editProfile(data: IEditProfileData): Promise<IUser>;

    abstract changePassword(oldPassword: string, newPassword: string, email: string): Promise<void>;

    abstract addAddress(data: IEditAddressData, userId: string): Promise<IAddress>;

    abstract editAddress(addressId: number, data: IEditAddressData): Promise<IAddress>;

    abstract delAddress(addressId: number): Promise<void>;

    abstract getDefaultAddress(userId: string): Promise<IAddress | null>;

    abstract getAddress(addressId: number): Promise<IAddress>;

    abstract getAddresses(token: string): Promise<IAddress[]>;

    abstract getOrdersList(options?: IListOptions): Promise<IOrdersList>;

    abstract getOrderById(id: number | string): Promise<IOrder>;

    abstract getOrderByOrderId(id: number | string): Promise<IOrder>;

    abstract updateOrderById(id: string): Promise<void>;

    abstract getOrderByToken(token: string): Promise<IOrder>;
}
