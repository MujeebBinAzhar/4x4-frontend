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
            <PageTitle title="Privacy Policy" metaTitle="Privacy Policy" />

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block faq">
                <div className="container container--max--xl">
                    <div className="faq__header">
                        <h1 className="faq__header-title">Privacy Policy</h1>
                    </div>

                    <div className="faq__section">
                        <h3 className="faq__section-title">Privacy and Policy</h3>
                        <div
                            className="faq__section-body"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Who we are</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li> Our website address is: https://allfor4x4.com.au/.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Personal Information Collection</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                {' '}
                                                When you visit our site, certain information about your device is
                                                automatically collected, such as web browser details, IP address, time
                                                zone, and cookies. We also gather data about the pages or products you
                                                view, the sites or search terms that led you to our site, and your
                                                interactions with our site, collectively referred to as “Device
                                                Information.”
                                            </li>
                                            <ul>
                                                <li>We collect Device Information using technologies like:</li>
                                                <li>
                                                    Cookies: Data files placed on your device with a unique identifier.
                                                </li>
                                                <li>
                                                    Log files: Records actions on the site, including IP address,
                                                    browser type, and timestamps.
                                                </li>
                                                <li>
                                                    {' '}
                                                    Web beacons, tags, and pixels: Electronic files tracking your site
                                                    browsing.
                                                </li>
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Additional Personal Information Collection:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                Comments: When you leave a comment on our site, we collect the data you
                                                provide in the comments form, along with your IP address and browser
                                                user agent string to prevent spam. If you use Gravatar, an anonymized
                                                string created from your email address may be shared with their service,
                                                and your profile picture becomes visible after comment approval.
                                            </li>
                                            <li>
                                                Media: Avoid uploading images with embedded location data (EXIF GPS).
                                                Visitors can download and extract location data from images on the
                                                website.
                                            </li>
                                            <li>
                                                Contact Forms: If you leave a comment, you may opt-in to save your name,
                                                email, and website in cookies for one year. Logging in sets temporary
                                                and persistent cookies to enhance your experience, including login
                                                information and screen display choices.
                                            </li>
                                            <li>
                                                Embedded Content: Articles may contain embedded content (videos, images)
                                                that behave like content from other websites. These external sites may
                                                collect data, use cookies, and track your interactions.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Use of Personal Information:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                We use Order Information to fulfil orders, process payments, arrange
                                                shipping, and send invoices.
                                            </li>
                                            <li>We also use this information to:</li>
                                            <ul>
                                                <li>Communicate with you</li>
                                                <li>Screen orders for potential risk or fraud</li>
                                                <li>Provide information or advertising based on your preferences</li>
                                            </ul>
                                            <li>
                                                Device Information is used to screen for potential risk and fraud,
                                                enhance site functionality, and optimize customer experience.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Analytics:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>We use analytics to improve our services and website performance.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Sharing Personal Information:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                We share Personal Information with third parties to facilitate order
                                                processing.
                                            </li>
                                            <li>
                                                We use WooCommerce & WordPress for our online store, and you can review
                                                their privacy policies.
                                            </li>
                                            <li>
                                                Google Analytics helps us understand site usage, and details on how
                                                Google uses your information can be found on their website.
                                            </li>
                                            <li>
                                                We may disclose Personal Information to comply with laws, respond to
                                                legal requests, or protect our rights.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Data Retention:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                We retain Order Information for our records unless you request its
                                                deletion.
                                            </li>
                                            <li>
                                                Comments and metadata are retained indefinitely for automated spam
                                                detection.
                                            </li>
                                            <li>
                                                Registered users can see, edit, or delete personal information in their
                                                profile. Website administrators can also access and modify this
                                                information.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Behavioural Advertising:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                Your Personal Information may be used for targeted advertisements or
                                                marketing communications.
                                            </li>
                                            <li>
                                                You can opt out of targeted advertising through links provided for
                                                Facebook, Google, Bing, and the Digital Advertising Alliance’s opt-out
                                                portal.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Do Not Track:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                Our site does not change data collection practices in response to Do Not
                                                Track signals from your browser.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Your Rights:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                You have the right to access, correct, update, or delete your personal
                                                information.
                                            </li>
                                            <li>Contact us at contact@allfor4x4.com.au to exercise these rights.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Our Commitment:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                We only collect necessary personal information for providing services
                                                and do so with your knowledge and consent.
                                            </li>
                                            <li>We protect stored data from loss, theft, and unauthorized access.</li>
                                            <li>
                                                We don’t share personally identifying information publicly or with third
                                                parties, unless required by law.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">External Links:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                Our website may link to external sites, and we are not responsible for
                                                their content or privacy policies.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Your Choice:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                You are free to refuse providing personal information, understanding
                                                that it may limit some services.
                                            </li>
                                            <li>
                                                Your continued use of our website implies acceptance of our privacy
                                                practices.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="faq__question" style={{ width: '100%' }}>
                                <h5 className="faq__question-title">Changes:</h5>
                                <div className="faq__question-answer">
                                    <div className="typography">
                                        <ul>
                                            <li>
                                                This policy may be updated to reflect changes in practices or for
                                                operational, legal, or regulatory reasons.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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

