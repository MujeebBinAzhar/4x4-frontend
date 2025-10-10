/* eslint-disable no-multiple-empty-lines */
// react
import React from 'react';
// application
import getShopPageData from '~/store/shop/shopHelpers';
import ShopPageShop from '~/components/shop/ShopPageShop';
import { wrapper } from '~/store/store';
import { shopApi } from '~/api';
import { ISeo } from '~/interfaces/product';
import PageTitle from '~/components/shared/PageTitle';

interface Props {
    seo: ISeo;
    origin: string;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { req } = context; // Extract req properly

    await getShopPageData(store, context);

    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    const { host } = req.headers;
    const seo = await shopApi.getPageSeo('shop');
    const origin = `${protocol}://${host}`;
    return {
        props: {
            seo,
            origin,
        },
    };
});

function Page(props: Props) {
    const { origin, seo } = props;
    const { metaDescription, metaKeywords, metaTitle } = seo;
    return (
        <React.Fragment>
            <PageTitle
                description={metaDescription || ''}
                keywords={metaKeywords || []}
                title="Shop"
                metaTitle={metaTitle || ''}
                url={`${origin}/product-category/products`}
                type="page"
            />
            <ShopPageShop layout="grid" gridLayout="grid-4-sidebar" sidebarPosition="start" />
        </React.Fragment>
    );
}

export default Page;

