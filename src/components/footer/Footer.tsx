/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-one-expression-per-line */
// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import Decor from '~/components/shared/Decor';
import FooterContacts from '~/components/footer/FooterContacts';
import FooterLinks from '~/components/footer/FooterLinks';
import FooterNewsletter from '~/components/footer/FooterNewsletter';
// data

export function Footer() {
    return (
        <div className="site-footer">
            <Decor className="site-footer__decor" type="bottom" />
            <div className="site-footer__widgets">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <FooterContacts className="site-footer__widget" />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <FooterLinks
                                className="site-footer__widget"
                                header={<FormattedMessage id="HEADER_INFORMATION" />}
                                links={[
                                    { title: <FormattedMessage id="LINK_ABOUT_US" />, url: '/about-us' },
                                    { title: <FormattedMessage id="LINK_DELIVERY_INFORMATION" /> },
                                    { title: <FormattedMessage id="LINK_PRIVACY_POLICY" />, url: '/privacy-policy' },
                                    { title: <FormattedMessage id="LINK_CONTACT_US" />, url: '/contact-us' },
                                    { title: <FormattedMessage id="LINK_RETURNS" />, url: '/refund-and-returns' },
                                    { title: <FormattedMessage id="LINK_SITE_MAP" />, url: '/api/sitemap.xml' },
                                ]}
                            />
                        </div>
                        <div className="col-6 col-md-3 col-xl-2">
                            <FooterLinks
                                className="site-footer__widget"
                                header={<FormattedMessage id="HEADER_MY_ACCOUNT" />}
                                links={[
                                    { title: <FormattedMessage id="LINK_STORE_LOCATION" />, url: '/contact-us' },
                                    { title: <FormattedMessage id="LINK_ORDER_HISTORY" />, url: '/account/orders' },
                                    { title: <FormattedMessage id="LINK_WISH_LIST" />, url: '/wishlist' },
                                ]}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                            <FooterNewsletter className="site-footer__widget" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="site-footer__bottom-row">
                        <div className="site-footer__copyright">
                            {/* copyright */}
                            {'All rights reserved. © '}
                            <AppLink href="/" rel="noreferrer">
                                All 4x4
                            </AppLink>
                        </div>
                        <div className="site-footer__payments">
                            <AppImage src="/images/payments.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Footer);

