/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
// react
import React, { useEffect, useState } from 'react';
// third-party
import { useRouter } from 'next/router';
// application
import { useStore } from 'react-redux';
import ShopPageOrderSuccess from '~/components/shop/ShopPageOrderSuccess';
import { accountApi } from '~/api';
import { IOrder } from '~/interfaces/order';
import { AppDispatch } from '~/store/types';
import { CART_RESET } from '~/store/cart/cartActionTypes';

function Page() {
    const store = useStore();
    const dispatch = store.dispatch as AppDispatch;
    const router = useRouter();
    const [order, setOrder] = useState<IOrder | null>(null);
    const { token, redirect_status = 'failed' } = router.query;

    useEffect(() => {
        let canceled = false;

        if (redirect_status === 'succeeded' && token) {
            accountApi.updateOrderById((token || '') as string);
        }
        if (typeof token === 'string') {
            accountApi.getOrderById(token).then((result) => {
                if (canceled) {
                    return;
                }

                setOrder(result);
            });
        } else {
            setOrder(null);
        }
        dispatch({
            type: CART_RESET,
        });
        return () => {
            canceled = true;
        };
    }, [token]);

    if (!order) {
        return null;
    }

    return <ShopPageOrderSuccess order={order} />;
}

export default Page;
