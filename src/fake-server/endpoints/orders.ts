/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
// application
import { error, makePageBasedNavigation } from '~/fake-server/utils';
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder, IOrderItem, IOrderTotal } from '~/interfaces/order';
import { orders } from '~/fake-server/database/orders';
import axiosInstance from '~/api/api-handler';
import { IAddressData } from '~/interfaces/address';

function transformOrder(input: any): IOrder {
    const user = input.user_info;

    const address: IAddressData = {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        company: '', // Assume no company provided
        country: user.country,
        address1: user.address,
        address2: '', // Assume no address2 provided
        suburb: user.suburb,
        state: '', // Assume no state provided
        postcode: user.zipCode,
        email: user.email,
        phone: user.contact,

    };

    const items: IOrderItem[] = input.cart.map((item: any) => ({
        product: {
            id: parseInt(item.productId, 16), // Mock product ID from MongoDB ObjectId
            name: item.name,
            excerpt: item.description.substring(0, 100), // Shorten description
            description: item.description,
            slug: item.name.toLowerCase().replace(/\s+/g, '-'),
            partNumber: 'N/A', // Mock part number
            stock: { quantity: 0 }, // Mock stock object
            price: item.price,
            compareAtPrice: null,
            attributes: [], // Assume no attributes
            compatibility: 'unknown',
            options: [],
            type: { id: 1, name: 'Default Type' }, // Mock type
        },
        options: [],
        price: item.price,
        quantity: item.quantity,
        total: item.total,
    }));

    const totals: IOrderTotal[] = [
        { title: 'Subtotal', price: input.subTotal },
        { title: 'Shipping', price: input.shippingCost },
        { title: 'Total', price: input.total },
    ];

    return {
        id: input.invoice,
        token: input._id,
        number: input.invoice.toString(),
        createdAt: input.createdAt,
        payment: input.paymentMethod,
        status: input.status,
        items: items,
        quantity: items.reduce((acc, curr) => acc + curr.quantity, 0),
        subtotal: input.subTotal,
        totals: totals,
        total: input.total,
        shippingAddress: address,
        billingAddress: address,
        orderId: input?.orderId,
    };
}
export async function getOrdersList(options?: IListOptions & {
    email: string
}): Promise<IOrdersList> {
    // Make the API request
    const response = await axiosInstance.get(`/order/orders-by-email/${options?.email}`);
    let items: IOrder[] = response.data.map((item: any) => transformOrder(item) as IOrder);
    const limit = options?.limit || 8;
    const sort = options?.sort || 'default';

    // Cursor based navigation
    // const [chunk, navigation] = makeCursorBasedNavigation(
    //     items,
    //     limit,
    //     options?.after,
    //     options?.before,
    //     (review) => review.id.toString(),
    // );
    // Page based navigation
    const [chunk, navigation] = makePageBasedNavigation(items, limit, options?.page || 1);
    items = chunk;

    return Promise.resolve({
        items,
        sort,
        navigation,
    });
}

export async function getOrderById(id: number | string): Promise<IOrder> {
    try {
        // Make the API request
        const response = await axiosInstance.get(`/order/${id}`);
        return transformOrder(response.data) as IOrder;
    } catch (e) {
        throw new Error('Failed to get order');
    }
}

export async function getOrderByOrdId(id: number | string): Promise<IOrder> {
    try {
        // Make the API request
        const response = await axiosInstance.get(`/order/order-by-orderId/${id}`);
        return transformOrder(response.data) as IOrder;
    } catch (e) {
        throw new Error('Failed to get order');
    }
}

export async function updateOrderById(id: number | string): Promise<void> {
    try {
        // Make the API request
        await axiosInstance.post(`/order/${id}`);
    } catch (e) {
        throw new Error('Failed to get order');
    }
}

export function getOrderByToken(token: string): Promise<IOrder> {
    const order = orders.find((x) => x.token === token);

    if (order) {
        return Promise.resolve(order);
    }

    return error('Page Not Found');
}
