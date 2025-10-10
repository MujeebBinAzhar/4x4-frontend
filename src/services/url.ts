/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */

// application
import slugify from 'react-slugify';
import { IAddress } from '~/interfaces/address';
import { IAppLinkHref } from '~/components/shared/AppLink';
import { IBrand } from '~/interfaces/brand';
import { ICategory, IShopCategory } from '~/interfaces/category';
import { IOrder } from '~/interfaces/order';
import { IPost } from '~/interfaces/post';
import { IProduct } from '~/interfaces/product';

const url = {
    // common
    home: () => '/',
    category: (category: ICategory): IAppLinkHref => {
        if (category.type === 'shop') {
            return url.shopCategory(category);
        }

        return '/';
    },

    // shop pages
    shop: () => '/product-category/products',
    shopCategoryProduct: (category: IShopCategory): IAppLinkHref => ({
        href: `/product-category/[slug]/products?slug=${slugify(category.slug)}`,
        as: `/product-category/${slugify(category.slug)}/products`,
    }),
    shopCategory: (category: IShopCategory): IAppLinkHref => ({
        href: `/product-category/[slug]/products?slug=${slugify(category.slug)}`,
        as: `/product-category/${slugify(category.slug)}/products`,
    }),
    products: ({ filters }: { filters?: Record<string, string> } = {}): IAppLinkHref => ({
        href: {
            pathname: '/product-category/products',
            query: {
                ...filters,
            },
        },
    }),
    product: (product: IProduct): IAppLinkHref => ({
        href: `/product/[slug]?slug=${slugify(product.slug)}`,
        as: `/product/${slugify(product.slug)}`,
    }),
    brand: (brand: IBrand) => '/',
    cart: () => '/cart',
    checkout: () => '/cart/checkout',
    checkoutSuccess: (order: IOrder): IAppLinkHref => ({
        href: `/cart/checkout/[token]?token=${order.token}`,
        as: `/cart/checkout/${order.token}`,
    }),
    wishlist: () => '/wishlist',
    compare: () => '/compare',
    trackOrder: () => '/track-order',

    // blog pages
    blog: () => '/blog',
    post: (post: IPost) => ({
        href: `/blog/[slug]?id=${post._id}`,
        as: `/blog/${post.slug}`,
    }),
    guestPost: () => '/guest-post',

    // auth pages
    signIn: () => '/account/login',
    signUp: () => '/account/login',
    passwordRecovery: () => '/',

    // account pages
    accountDashboard: (): IAppLinkHref => '/account/dashboard',
    accountGarage: () => '/account/garage',
    accountProfile: () => '/account/profile',
    accountPassword: () => '/account/password',
    accountOrders: () => '/account/orders',
    accountOrderView: (order: Partial<IOrder>): IAppLinkHref => ({
        href: `/account/orders/[id]?id=${order.orderId}`,
        as: `/account/orders/${order.orderId}`,
    }),
    accountAddresses: () => '/account/addresses',
    accountAddressNew: (): IAppLinkHref => ({
        href: '/account/addresses/[id]?id=new',
        as: '/account/addresses/new',
    }),
    accountAddressEdit: (address: IAddress): IAppLinkHref => ({
        href: `/account/addresses/[id]?id=${address.id}`,
        as: `/account/addresses/${address.id}`,
    }),

    // site pages
    pageAboutUs: () => '/about-us',
    pageContactUs: () => '/contact-us',
    pageStoreLocation: () => '/',
    pageTerms: () => '/terms',
};

export default url;

