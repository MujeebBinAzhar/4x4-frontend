import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { shopApi } from '~/api';
import axiosInstance from '~/api/api-handler';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockMap from '~/components/blocks/BlockMap';
import BlockSpace from '~/components/blocks/BlockSpace';
import PageTitle from '~/components/shared/PageTitle';
import { ISeo } from '~/interfaces/product';

interface Props {
    seo: ISeo;
    origin: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';
    const { host } = req.headers;
    const seo = await shopApi.getPageSeo('contact-us');
    const origin = `${protocol}://${host}`;

    return {
        props: {
            seo,
            origin,
        },
    };
};

function Page(props: Props) {
    const { origin, seo } = props;
    const { metaDescription, metaKeywords, metaTitle }: ISeo = seo;

    // State for form data and feedback messages
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        // Basic form validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setMessage('All fields are required.');
            setStatus('error');
            return;
        }

        try {
            const response = await axiosInstance.post('/contact', formData);

            if (response.status === 201) {
                setStatus('success');
                toast.success('Your message has been sent successfully.');
                setFormData({
                    name: '', email: '', subject: '', message: '',
                }); // Clear form
            } else {
                toast.error(response?.data?.message || 'Something went wrong.');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error?.response?.data?.error || 'An unknown error occurred.');
        }
    };

    return (
        <React.Fragment>
            <PageTitle
                description={metaDescription || ''}
                keywords={metaKeywords || []}
                title="Contact us"
                metaTitle={metaTitle || ''}
                url={`${origin}/contact-us`}
                type="page"
            />
            <BlockMap />

            <BlockHeader
                pageTitle="Contact Us"
                breadcrumb={[
                    { title: 'Home', url: '/' },
                    { title: 'Contact Us', url: '/contact-us' },
                ]}
                afterHeader={false}
            />

            <div className="block">
                <div className="container container--max--lg">
                    <div className="card">
                        <div className="card-body card-body--padding--2">
                            <div className="row">
                                <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                    <div className="mr-1">
                                        <h4 className="contact-us__header card-title">Our Address</h4>
                                        <div className="contact-us__address">
                                            <p>
                                                715 Fake Ave, Apt. 34, New York, NY 10021 USA
                                                <br />
                                                Email: contact@allfor4x4.com.au
                                                <br />
                                                Phone Number: +1 754 000-00-00
                                            </p>
                                            <p>
                                                <strong>Opening Hours</strong>
                                                <br />
                                                Monday to Friday: 8am-8pm
                                                <br />
                                                Saturday: 8am-6pm
                                                <br />
                                                Sunday: 10am-4pm
                                            </p>
                                            <p>
                                                <strong>Comment</strong>
                                                <br />
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="ml-1">
                                        <h4 className="contact-us__header card-title">Leave us a Message</h4>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="name">Your Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        className="form-control"
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        disabled={status === 'loading'}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        className="form-control"
                                                        placeholder="Email Address"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        disabled={status === 'loading'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="subject">Subject</label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    className="form-control"
                                                    placeholder="Subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    disabled={status === 'loading'}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="message">Message</label>
                                                <textarea
                                                    id="message"
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Your Message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    disabled={status === 'loading'}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={status === 'loading'}
                                            >
                                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                                            </button>

                                            {message && (
                                                <div className={`mt-3 alert alert-${status === 'error' ? 'danger' : 'success'}`}>
                                                    {message}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
