/* eslint-disable import/prefer-default-export */

// application
import { IBrand } from '~/interfaces/brand';
import { IGetBrandsOptions } from '~/api/base';
import axiosInstance from '~/api/api-handler';

export async function getBrands(options?: IGetBrandsOptions): Promise<IBrand[]> {
    try {
        const response = await axiosInstance.get<IBrand[]>('/brands', {
            params: {
                limit: options?.limit,
            },
        });
        return response.data as IBrand[]; // Typed response
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw error;
    }
}
