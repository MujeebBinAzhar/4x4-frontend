/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
// application
import { delayResponse, error } from '~/fake-server/utils';
import { IEditProfileData } from '~/api/base';
import { IUser } from '~/interfaces/user';
import axiosInstance from '~/api/api-handler';

export async function accountSignIn(email: string, password: string): Promise<IUser> {
    try {
        // Make the API request
        const response = await axiosInstance.post('/user/login', {
            email,
            password,
        });
        return response.data as IUser;
        // eslint-disable-next-line max-len
        // return response.data.map((item) => transformProductResponse(item)) as unknown as IProduct[]; // Return the product data from the response
    } catch (e) {
        return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
    }
}

export async function accountSignUp(name: string, email: string, password: string): Promise<IUser> {
    if (!/^.+@.+$/.test(email)) {
        return delayResponse(() => error('AUTH_INVALID_EMAIL'));
    }

    if (email === 'contact@allfor4x4.com.au') {
        return delayResponse(() => error('AUTH_EMAIL_ALREADY_IN_USE'));
    }

    if (password.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }

    try {
        // Make the API request
        const response = await axiosInstance.post(`/user/register/${process.env.NEXT_PUBLIC_JWT_SECRET_FOR_VERIFY}`, {
            name,
            email,
            password,
        });
        return response.data as IUser;
        // eslint-disable-next-line max-len
        // return response.data.map((item) => transformProductResponse(item)) as unknown as IProduct[]; // Return the product data from the response
    } catch (error) {
        throw new Error('Failed to creating user');
    }
}

export function accountSignOut(): Promise<void> {
    return Promise.resolve();
}

export function accountEditProfile(data: IEditProfileData): Promise<IUser> {
    const user: IUser = {
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: '//www.gravatar.com/avatar/bde30b7dd579b3c9773f80132523b4c3?d=mp&s=88',
    };

    return delayResponse(Promise.resolve(user));
}

export async function accountChangePassword(oldPassword: string, newPassword: string, email: string): Promise<void> {
    if (newPassword.length < 6) {
        return delayResponse(() => error('AUTH_WEAK_PASSWORD'));
    }

    try {
        // Make the API request
        await axiosInstance.post('/user/change-password', {
            currentPassword: oldPassword,
            newPassword,
            email,
        });
        return delayResponse(Promise.resolve());

        // eslint-disable-next-line max-len
        // return response.data.map((item) => transformProductResponse(item)) as unknown as IProduct[]; // Return the product data from the response
    } catch (e) {
        return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
    }
}

