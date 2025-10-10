/* eslint-disable no-multiple-empty-lines */
// react
import React from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
// application
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import AsyncAction from '~/components/shared/AsyncAction';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
import CurrencyFormat from '~/components/shared/CurrencyFormat';
import Rating from '~/components/shared/Rating';
import StockStatusBadge from '~/components/shared/StockStatusBadge';
import url from '~/services/url';
import { Cross12Svg } from '~/svg';
import { useCartAddItem } from '~/store/cart/cartHooks';
import { useWishlist, useWishlistRemoveItem } from '~/store/wishlist/wishlistHooks';
import { IProductStock, ISeo } from '~/interfaces/product';
import { shopApi } from '~/api';
import PageTitle from '~/components/shared/PageTitle';

interface Props {
    seo: ISeo;
    origin: string;
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    const { host } = req.headers;
    let seo: ISeo = {
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
    };
    seo = await shopApi.getPageSeo('wishlist');
    const origin = `${protocol}://${host}`;

    return {
        props: {
            seo,
            origin,
        },
    };
};
function Page(props: Props) {
    const intl = useIntl();
    const wishlist = useWishlist();
    const cartAddItem = useCartAddItem();
    const wishlistRemoveItem = useWishlistRemoveItem();
    const { items } = wishlist;
    const { origin, seo } = props;
    const { metaDescription, metaKeywords, metaTitle }: ISeo = seo;

    if (items.length === 0) {
        return (
            <React.Fragment>
                <PageTitle
                    description={metaDescription || ''}
                    keywords={metaKeywords || []}
                    title="Wishlist"
                    metaTitle={metaTitle || ''}
                    url={`${origin}/wishlist`}
                    type="page"
                />
                <BlockHeader
                    breadcrumb={[
                        { title: intl.formatMessage({ id: 'LINK_HOME' }), url: '/' },
                        { title: intl.formatMessage({ id: 'LINK_WISHLIST' }), url: '/' },
                    ]}
                />

                <div className="block-empty">
                    <div className="container">
                        <div className="block-empty__body">
                            <h1 className="block-empty__title">
                                <FormattedMessage id="HEADER_WISHLIST_EMPTY_TITLE" />
                            </h1>
                            <div
                                className="block-empty__message"
                                dangerouslySetInnerHTML={{
                                    __html: intl.formatMessage({ id: 'HEADER_WISHLIST_EMPTY_SUBTITLE' }),
                                }}
                            />
                            <div className="block-empty__action">
                                <AppLink href={url.home()} className="btn btn-primary btn-sm">
                                    <FormattedMessage id="BUTTON_GO_TO_HOMEPAGE" />
                                </AppLink>
                            </div>
                        </div>
                    </div>
                </div>

                <BlockSpace layout="before-footer" />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Head>
                <title>Home | All 4x4</title>
                <meta name="description" content={metaDescription || 'Shop the best products on our store.'} />
                <meta name="keywords" content={metaKeywords?.join(', ')} />
                <meta property="og:title" content={metaTitle || 'Home'} />
                <meta property="og:description" content={metaDescription || 'Shop the best products on our store.'} />
                <meta property="og:type" content="page" />
                <meta property="og:url" content={`${origin}/wishlist`} />
            </Head>
            <BlockHeader
                pageTitle={<FormattedMessage id="HEADER_WISHLIST" />}
                breadcrumb={[
                    { title: intl.formatMessage({ id: 'LINK_HOME' }), url: '/' },
                    { title: intl.formatMessage({ id: 'LINK_WISHLIST' }), url: '/' },
                ]}
            />

            <div className="block">
                <div className="container container--max--xl">
                    <div className="wishlist">
                        <table className="wishlist__table">
                            <thead className="wishlist__head">
                                <tr className="wishlist__row wishlist__row--head">
                                    <th className="wishlist__column wishlist__column--head wishlist__column--image">
                                        <FormattedMessage id="TABLE_IMAGE" />
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--product">
                                        <FormattedMessage id="TABLE_PRODUCT" />
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--stock">
                                        <FormattedMessage id="TABLE_STOCK_STATUS" />
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--price">
                                        <FormattedMessage id="TABLE_PRICE" />
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--button">
                                        <span className="sr-only">
                                            <FormattedMessage id="TABLE_ADD_TO_CART" />
                                        </span>
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--remove">
                                        <span className="sr-only">
                                            <FormattedMessage id="TABLE_REMOVE" />
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="wishlist__body">
                                {items.map((product, index) => (
                                    <tr key={index} className="wishlist__row wishlist__row--body">
                                        <td className="wishlist__column wishlist__column--body wishlist__column--image">
                                            <div className="image image--type--product">
                                                <AppLink href={url.product(product)} className="image__body">
                                                    <AppImage
                                                        className="image__tag"
                                                        src={product.images && product.images[0]}
                                                    />
                                                </AppLink>
                                            </div>
                                        </td>
                                        <td
                                            className={classNames(
                                                'wishlist__column',
                                                'wishlist__column--body',
                                                'wishlist__column--product',
                                            )}
                                        >
                                            <div className="wishlist__product-name">
                                                <AppLink href={url.product(product)}>{product.name}</AppLink>
                                            </div>
                                            <div className="wishlist__product-rating">
                                                <div className="wishlist__product-rating-stars">
                                                    <Rating value={product.rating || 0} />
                                                </div>
                                                <div className="wishlist__product-rating-title">
                                                    <FormattedMessage
                                                        id="TEXT_RATING_LABEL"
                                                        values={{
                                                            rating: product.rating,
                                                            reviews: product.reviews,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={classNames(
                                                'wishlist__column',
                                                'wishlist__column--body',
                                                'wishlist__column--stock',
                                            )}
                                        >
                                            <StockStatusBadge stock={product.stock.availability as IProductStock} />
                                        </td>
                                        <td
                                            className={classNames(
                                                'wishlist__column',
                                                'wishlist__column--body',
                                                'wishlist__column--price',
                                            )}
                                        >
                                            <CurrencyFormat value={product.price} />
                                        </td>
                                        <td
                                            className={classNames(
                                                'wishlist__column',
                                                'wishlist__column--body',
                                                'wishlist__column--button',
                                            )}
                                        >
                                            <AsyncAction
                                                action={() => cartAddItem(product)}
                                                render={({ run, loading }) => (
                                                    <button
                                                        type="button"
                                                        className={classNames('btn', 'btn-sm', 'btn-primary', {
                                                            'btn-loading': loading,
                                                        })}
                                                        onClick={run}
                                                    >
                                                        <FormattedMessage id="BUTTON_ADD_TO_CART" />
                                                    </button>
                                                )}
                                            />
                                        </td>
                                        <td
                                            className={classNames(
                                                'wishlist__column',
                                                'wishlist__column--body',
                                                'wishlist__column--remove',
                                            )}
                                        >
                                            <AsyncAction
                                                action={() => wishlistRemoveItem(product.id)}
                                                render={({ run, loading }) => (
                                                    <button
                                                        type="button"
                                                        className={classNames(
                                                            'wishlist__remove',
                                                            'btn',
                                                            'btn-sm',
                                                            'btn-muted',
                                                            'btn-icon',
                                                            {
                                                                'btn-loading': loading,
                                                            },
                                                        )}
                                                        onClick={run}
                                                    >
                                                        <Cross12Svg />
                                                    </button>
                                                )}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;

