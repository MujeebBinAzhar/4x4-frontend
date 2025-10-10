/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
// react
import React from 'react';
// third-party
import { GetServerSideProps } from 'next';
// application
import Head from 'next/head';
import ShopPageProduct from '~/components/shop/ShopPageProduct';
import { IProduct } from '~/interfaces/product';
import { shopApi } from '~/api';
import SitePageNotFound from '~/components/site/SitePageNotFound';

interface Props {
    product: IProduct | null;
    origin: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
    const slug = typeof params?.slug === 'string' ? params?.slug : null;
    const product = slug ? await shopApi.getProductBySlug(slug) : null;
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    // Get the host (domain and port)
    const { host } = req.headers;

    // Construct the origin (protocol + host)
    const origin = `${protocol}://${host}`;

    return {
        props: {
            product,
            origin,
        },
    };
};

function Page(props: Props) {
    const { product, origin } = props;

    if (product === null) {
        return <SitePageNotFound />;
    }

    const { name, metaDescription, metaKeywords, metaTitle } = product;
    const parseKeywords = JSON.parse(metaKeywords || '[""]');
    return (
        <React.Fragment>
            <Head>
                <title>{name} - Shop | All 4x4</title>
                <meta name="description" content={metaDescription || 'Shop the best products on our store.'} />
                <meta name="keywords" content={parseKeywords.join(', ')} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription || 'Shop the best products on our store.'} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={`${origin}/product/${product.slug}`} />
                {product.images && product.images?.length > 0 ? (
                    <meta
                        property="og:image"
                        content={product?.images[0] || `${origin}/images/products/product-1-1.jpg`}
                    />
                ) : (
                    <meta property="og:image" content={`${origin}/images/products/product-1-1.jpg`} />
                )}
            </Head>
            <ShopPageProduct product={product} layout="full" />
        </React.Fragment>
    );
}

export default Page;
