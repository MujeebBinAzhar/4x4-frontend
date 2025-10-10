/* eslint-disable linebreak-style */
// application
import { addresses } from '~/fake-server/database/addresses';
import { clone, delayResponse } from '~/fake-server/utils';
import { IAddress } from '~/interfaces/address';
import { IEditAddressData } from '~/api/base';
import axiosInstance from '~/api/api-handler';

export async function getDefaultAddress(userId: string): Promise<IAddress> {
    try {
        const response = await axiosInstance.get(`/user/shipping/address/default/${userId}`);
        return response.data as IAddress;
    } catch (e) {
        throw new Error('Failed to get address');
    }
}

export function getAddress(addressId: number): Promise<IAddress> {
    return Promise.resolve(clone(addresses.find((x) => x.id === addressId) || null));
}

export async function getAddresses(token: string): Promise<IAddress[]> {
    try {
        // Make the API request
        const response = await axiosInstance.get(`/user/shipping/address/${token}`);
        return response.data?.shippingAddress as IAddress[];
        // eslint-disable-next-line max-len
        // return response.data.map((item) => transformProductResponse(item)) as unknown as IProduct[]; // Return the product data from the response
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get address');
    }
}

export async function addAddress(data: Partial<IEditAddressData>, userId: string): Promise<IAddress> {
    const address: Omit<IAddress, 'id'> = {
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        address1: '',
        address2: '',
        suburb: '',
        state: '',
        postcode: '',
        email: '',
        phone: '',
        default: false,
        ...data,
    };
    try {
        // Make the API request
        const response = await axiosInstance.post(`/user/shipping/address/${userId}`, address);
        return response.data as IAddress;
        // eslint-disable-next-line max-len
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get address');
    }
}

// noinspection DuplicatedCode
export function editAddress(addressId: number, data: IEditAddressData): Promise<IAddress> {
    const address = addresses.find((x) => x.id === addressId);

    if (!address) {
        throw new Error('Address not found');
    }

    address.firstName = data.firstName;
    address.lastName = data.lastName;
    address.company = data.company;
    address.country = data.country;
    address.address1 = data.address1;
    address.address2 = data.address2;
    address.suburb = data.suburb;
    address.state = data.state;
    address.postcode = data.postcode;
    address.email = data.email;
    address.phone = data.phone;
    address.default = data.default;

    if (address.default) {
        for (let i = 0; i < addresses.length; i += 1) {
            addresses[i].default = addresses[i].id === addressId;
        }
    }

    return delayResponse(Promise.resolve(address));
}

export function delAddress(addressId: number): Promise<void> {
    const index = addresses.findIndex((x) => x.id === addressId);

    if (index !== -1) {
        const address = addresses.splice(index, 1)[0];

        if (address.default && addresses.length > 0) {
            addresses[0].default = true;
        }
    }

    return delayResponse(Promise.resolve());
}
