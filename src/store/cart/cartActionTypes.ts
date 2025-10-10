// application
import { AppAction } from '~/store/types';
import { ICartItemOption } from '~/store/cart/cartTypes';
import { IProduct } from '~/interfaces/product';

export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_UPDATE_QUANTITIES = 'CART_UPDATE_QUANTITIES';
export const CART_UPDATE_SHIPPING = 'CART_UPDATE_SHIPPING'; // New action type
export const CART_RESET = 'CART_RESET';

export interface CartItemQuantity {
    itemId: number;
    value: number;
}

export interface CartAddItemAction {
    type: typeof CART_ADD_ITEM;
    product: IProduct;
    options: ICartItemOption[];
    quantity: number;
}

export interface CartRemoveItemAction {
    type: typeof CART_REMOVE_ITEM;
    itemId: number;
}

export interface CartUpdateQuantitiesAction {
    type: typeof CART_UPDATE_QUANTITIES;
    quantities: CartItemQuantity[];
}

// New interface for updating shipping
export interface CartUpdateShippingAction {
    type: typeof CART_UPDATE_SHIPPING;
    shipping: number; // The new shipping cost
}

export interface CartReset {
    type: typeof CART_RESET;
}
export type CartAction =
    | CartAddItemAction
    | CartRemoveItemAction
    | CartUpdateQuantitiesAction
    | CartUpdateShippingAction
    | CartReset; // Include the new action in the type union

export type CartThunkAction<T = void> = AppAction<CartAction, T>;
