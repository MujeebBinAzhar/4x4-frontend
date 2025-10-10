import classNames from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import axiosInstance from '~/api/api-handler';
import AppLink from '~/components/shared/AppLink';
import theme from '~/data/theme';

const FooterNewsletter: FunctionComponent<React.HTMLAttributes<HTMLElement>> = () => {
    const intl = useIntl();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setMessage('Invalid Email address.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const response = await axiosInstance.post('/newsletter/subscribe', { email });
            console.log(response);
            if (response.status === 201) {
                setStatus('success');
                toast.success('You have successfully subscribed to our newsletter.');
                // setMessage(intl.formatMessage({ id: 'SUCCESS_SUBSCRIBE_MESSAGE' }));
                setEmail(''); // Clear input on success
            } else {
                throw new Error(response?.data?.message || 'Subscription failed.');
            }
        } catch (error: any) {
            setStatus('error');
            toast.error(error?.response?.data?.error || 'An unknown error occurred.');
        }
    };

    const socialLinks = [
        { type: 'facebook', url: theme.author.profile_url, icon: 'fab fa-facebook-f' },
        { type: 'twitter', url: theme.author.profile_url, icon: 'fab fa-twitter' },
        { type: 'youtube', url: theme.author.profile_url, icon: 'fab fa-youtube' },
        { type: 'instagram', url: theme.author.profile_url, icon: 'fab fa-instagram' },
        { type: 'rss', url: theme.author.profile_url, icon: 'fas fa-rss' },
    ];

    return (
        <div className="footer-newsletter">
            <h5 className="footer-newsletter__title">
                <FormattedMessage id="HEADER_NEWSLETTER" />
            </h5>
            <div className="footer-newsletter__text">
                <FormattedMessage id="TEXT_NEWSLETTER_MESSAGE" />
            </div>

            <form className="footer-newsletter__form" onSubmit={handleFormSubmit}>
                <label className="sr-only" htmlFor="footer-newsletter-address">
                    <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                </label>
                <input
                    id="footer-newsletter-address"
                    type="email"
                    className="footer-newsletter__form-input"
                    placeholder={intl.formatMessage({ id: 'INPUT_EMAIL_ADDRESS_PLACEHOLDER' })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    className={classNames('footer-newsletter__form-button  btn-muted btn-icon', {
                        'btn-loading': status === 'loading',
                    })}
                    disabled={status === 'loading'}

                >
                    <FormattedMessage id="BUTTON_SUBSCRIBE" />
                </button>
            </form>

            {message && (
                <div className={`footer-newsletter__message footer-newsletter__message--${status}`}>
                    {message}
                </div>
            )}

            <div className="footer-newsletter__text footer-newsletter__text--social">
                <FormattedMessage id="TEXT_SOCIAL_LINKS_MESSAGE" />
            </div>

            <div className="footer-newsletter__social-links social-links">
                <ul className="social-links__list">
                    {socialLinks.map((link, index) => (
                        <li key={index} className={`social-links__item social-links__item--${link.type}`}>
                            <AppLink href={link.url} target="_blank">
                                <i className={link.icon} />
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FooterNewsletter;
