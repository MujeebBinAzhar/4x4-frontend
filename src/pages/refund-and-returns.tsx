/* eslint-disable no-multiple-empty-lines */
// react
import React from 'react';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';

function Page() {
    return (
        <React.Fragment>
            <PageTitle title="Refund and Returns Policy" metaTitle="Refund and Returns Policy" />

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block faq">
                <div className="container container--max--xl">
                    <div className="faq__header">
                        <h1 className="faq__header-title">Refund and Returns Policy</h1>
                    </div>

                    <div className="faq__section">
                        <h3 className="faq__section-title">Warranty and Returns Policy</h3>
                        <div className="faq__section-body">
                            <div className="faq__question">
                                <h5 className="faq__question-title">Authorization and Condition</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>All returns must be authorized before returning goods.</li>
                                            <li>
                                                Items for refund or exchange must be in the original condition with tags
                                                attached (unless faulty).
                                            </li>
                                            <li>
                                                Packaged goods must be returned in their original condition, or the
                                                return may not be accepted (unless faulty).
                                            </li>
                                            <li>
                                                Returned items not in acceptable condition will be sent back at the
                                                customer’s expense.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">Timeframe and Restocking Fee</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            <ul>
                                                <li>Returns must be made within 30 days from the shipment date.</li>
                                                <li>All returns will incur a 10% restocking fee.</li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">Warranty Terms</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            <ul>
                                                <li>Warranty determination occurs after inspection by our team.</li>
                                                <li>
                                                    Items incorrectly installed may not be warranted as per our Terms
                                                    and Conditions.
                                                </li>
                                                <li>
                                                    All components are covered under warranty for manufacturer faults;
                                                    wear and tear are not considered manufacturer faults.
                                                </li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">Refunds & Returns – Store Credit</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            <ul>
                                                <li> Warehouse processes orders within 24 hours.</li>
                                                <li>
                                                    If a return is requested beyond 24 hours, eligibility for a refund
                                                    is subject to returning the item at the customer’s expense.
                                                </li>
                                                <li>
                                                    Upon receiving and inspecting the returned item, an email
                                                    notification will be sent regarding the approval or rejection of
                                                    store credit.
                                                </li>
                                                <li>
                                                    {' '}
                                                    Items cannot be returned based on a change of mind policy, due to
                                                    potential sellability issues after multiple location transfers and
                                                    box damage.
                                                </li>
                                                <li>
                                                    {' '}
                                                    If approved, store credit will be processed. Refund requests before
                                                    item dispatch result in immediate store credit.
                                                </li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="faq__section">
                        <h3 className="faq__section-title">Payment Information</h3>
                        <div className="faq__section-body">
                            <div className="faq__question">
                                <h5 className="faq__question-title">What payments methods are available?</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">Can I split my payment?</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <h3 className="faq__section-title">Orders and Returns</h3>
                        <div className="faq__section-body">
                            <div className="faq__question">
                                <h5 className="faq__question-title">How do I return or exchange an item?</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question">
                                <h5 className="faq__question-title">How do I cancel an order?</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="faq__footer">
                        <div className="faq__footer-title">Still Have A Questions?</div>
                        <div className="faq__footer-subtitle">
                            We will be happy to answer any questions you may have.
                        </div>
                        <AppLink href={url.pageContactUs()} className="btn btn-primary">
                            Contact Us
                        </AppLink>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;

