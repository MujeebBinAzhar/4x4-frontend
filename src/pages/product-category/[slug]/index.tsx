/* eslint-disable object-curly-newline */
/* eslint-disable no-multiple-empty-lines */
// react
import React from 'react';
// third-party
import { GetServerSideProps } from 'next';
// application
import ShopPageCategory from '~/components/shop/ShopPageCategory';
import SitePageNotFound from '~/components/site/SitePageNotFound';
import { IShopCategory } from '~/interfaces/category';
import { shopApi } from '~/api';
import { ISeo } from '~/interfaces/product';
import PageTitle from '~/components/shared/PageTitle';

interface Props {
    seo: ISeo;
    origin: string;
    slug: string | null;
    category: IShopCategory | null;
    subcategories: IShopCategory[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
    const slug = typeof params?.slug === 'string' ? params?.slug : null;
    const [category, subcategories] = await Promise.all([
        slug ? shopApi.getCategoryBySlug(slug, { depth: 2 }) : null,
        slug ? [] : shopApi.getCategories({ depth: 1 }),
    ]);
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    const { host } = req.headers;
    const seo = await shopApi.getPageSeo('shop');
    const origin = `${protocol}://${host}`;

    return {
        props: {
            seo,
            origin,
            slug,
            category,
            subcategories,
        },
    };
};

function Page(props: Props) {
    const { slug, category, subcategories, origin, seo } = props;
    const { metaDescription, metaKeywords, metaTitle } = seo;
    if (slug !== null && category === null) {
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
                <SitePageNotFound />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <PageTitle
                description={metaDescription || ''}
                keywords={metaKeywords || []}
                title="Shop"
                metaTitle={metaTitle || ''}
                url={`${origin}/cart`}
                type="page"
            />
            <ShopPageCategory layout="columns-4-sidebar" category={category} subcategories={subcategories} />
        </React.Fragment>
    );
}

export default Page;

