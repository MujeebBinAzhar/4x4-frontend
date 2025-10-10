/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */

// application
import { ICheckoutData } from '~/api/base';
import { IOrderItem } from '~/interfaces/order';
import { getProductById } from './products';
import axiosInstance from '~/api/api-handler';
import { IDeliveryForm } from '~/components/shared/DeliveryMethodForm';

export async function checkout(
    data: ICheckoutData & {
        userId: string;
        shipToDifferentAddress: boolean;
        deliveryMethod: IDeliveryForm;
        shipping: number;
    },
): Promise<any> {
    const items: IOrderItem[] = await Promise.all(
        data.items.map(async (x) => {
            const product = await getProductById(x.productId as unknown as string); // Fetch product from backend

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                product,
                options: x.options,
                price: product.price,
                quantity: x.quantity,
                total: product.price * x.quantity,
            };
        }),
    );

    try {
        // Call backend to create a Stripe checkout session
        const response = await axiosInstance.post('/order/create-checkout-session', {
            items,
            shipping: data.shipping || 0,
            shipToDifferentAddress: data.shipToDifferentAddress,
            billingAddress: data.billingAddress,
            shippingAddress: data.shippingAddress,
            userId: data.userId,
            successUrl: `${window.origin}/cart/checkout`,
            cancelUrl: window.origin,
            deliverMethod: data.deliveryMethod,
        });

        const { url } = response.data;

        return url;
    } catch (error) {
        console.error('Error redirecting to checkout:');

        throw new Error('Failed to procceed');
    }
}
