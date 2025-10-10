/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from './track-order.module.scss';
import BlockSpace from '~/components/blocks/BlockSpace';
import axiosInstance from '~/api/api-handler';
import PageTitle from '~/components/shared/PageTitle';

export default function TrackOrderForm() {
        const [orderNumber, setOrderNumber] = useState('');
        const [email, setEmail] = useState('');
        const [orderStatus, setOrderStatus] = useState<any>(null);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState('');
        const intl = useIntl();

        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setIsLoading(true);
                setError('');
                await axiosInstance.get(`/order/track-order/?orderNumber=${orderNumber}&email=${email}`).then((res) => {
                        if (res.data) {
                                setOrderStatus(res.data);
                        }
                }).catch(() => {
                        setError('Order not found. Please check your order number and email.');
                        setOrderStatus(null);
                });
                setIsLoading(false);
        };

        return (

                <React.Fragment>
                        <PageTitle
                                description={intl.formatMessage({ id: 'HEADER_TRACK_ORDER' })}
                                title={intl.formatMessage({ id: 'HEADER_TRACK_ORDER' })}
                                keywords={['']}
                                type="page"
                                metaTitle={intl.formatMessage({ id: 'HEADER_TRACK_ORDER' })}
                                url="/"
                        />

                        <BlockSpace layout="after-header" />

                        <div className="block">
                                <div className="container">
                                        <div className=" justify-content-center " style={{ marginLeft: '250px', marginRight: '250px' }}>
                                                <div className="">
                                                        <div className="card ml-md-3 mr-md-3">
                                                                <div className="card-body card-body--padding--2">
                                                                        <h1 className="card-title card-title--lg">
                                                                                <FormattedMessage id="HEADER_TRACK_ORDER" />
                                                                        </h1>

                                                                        <p className="mb-4">
                                                                                <FormattedMessage id="TEXT_TRACK_ORDER_HELP" />
                                                                        </p>
                                                                        <form onSubmit={handleSubmit}>
                                                                                <div className="form-group">
                                                                                        <label htmlFor="track-order-id">
                                                                                                <FormattedMessage id="INPUT_ORDER_ID_LABEL" />
                                                                                        </label>
                                                                                        <input
                                                                                                id="track-order-id"
                                                                                                type="text"
                                                                                                value={orderNumber}
                                                                                                onChange={(e) => setOrderNumber(e.target.value)}
                                                                                                className="form-control"
                                                                                                placeholder={intl.formatMessage({ id: 'INPUT_ORDER_ID_PLACEHOLDER' })}
                                                                                        />
                                                                                </div>
                                                                                <div className="form-group">
                                                                                        <label htmlFor="track-email">
                                                                                                <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                                                                                        </label>
                                                                                        <input
                                                                                                id="track-email"
                                                                                                type="email"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                className="form-control"
                                                                                                placeholder={intl.formatMessage({
                                                                                                        id: 'INPUT_EMAIL_ADDRESS_PLACEHOLDER',
                                                                                                })}
                                                                                        />
                                                                                </div>
                                                                                <div className="form-group pt-4 mb-1">
                                                                                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                                                                                                {
                                                                                                        isLoading ? 'Searching...' : <FormattedMessage id="BUTTON_TRACK" />
                                                                                                }

                                                                                        </button>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {error && <div className={`justify-content-center ${styles.error}`} style={{ marginLeft: '265px', marginRight: '265px' }}>{error}</div>}

                                        {orderStatus && (
                                                <div className=" justify-content-center" style={{ marginLeft: '250px', marginRight: '250px' }}>
                                                        <div className="card ml-md-3 mr-md-3">
                                                                <div className="card-body card-body--padding--2">
                                                                        <h2 className={styles.resultTitle}>Order Status</h2>

                                                                        <div className={styles.timeline}>
                                                                                <div className={`${styles.timelineItem} ${styles.completed}`}>
                                                                                        <div className={styles.timelineIcon}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-dollar-sign">
                                                                                                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                                                                                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                                                                                        <path d="M12 18V6" />
                                                                                                </svg>
                                                                                        </div>
                                                                                        <div className={styles.timelineContent}>
                                                                                                <h3>Payment Received</h3>
                                                                                                <p>Your payment has been successfully processed.</p>
                                                                                                <span className={styles.timelineDate}>{new Date(orderStatus.createdAt).toDateString()}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className={`${styles.timelineItem} ${orderStatus.status === 'Pending' || orderStatus.status === 'Processing' || orderStatus.status === 'Out-For-Delivery' || orderStatus.status === 'Delivered' ? styles.completed : ''}`}>
                                                                                        <div className={styles.timelineIcon}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-dot">
                                                                                                        <circle cx="12" cy="12" r="10" />
                                                                                                        <circle cx="12" cy="12" r="1" />
                                                                                                </svg>
                                                                                        </div>
                                                                                        <div className={styles.timelineContent}>
                                                                                                <h3>Pending</h3>
                                                                                                <p>Your order has been received and is being processed.</p>
                                                                                                <span className={styles.timelineDate}>{new Date(orderStatus?.updatedAt).toDateString()}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className={`${styles.timelineItem} ${orderStatus.status === 'Processing' || orderStatus.status === 'Out-For-Delivery' || orderStatus.status === 'Delivered' ? styles.completed : ''}`}>
                                                                                        <div className={styles.timelineIcon}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package">
                                                                                                        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                                                                                                        <path d="M12 22V12" />
                                                                                                        <polyline points="3.29 7 12 12 20.71 7" />
                                                                                                        <path d="m7.5 4.27 9 5.15" />
                                                                                                </svg>
                                                                                        </div>
                                                                                        <div className={styles.timelineContent}>
                                                                                                <h3>Processing</h3>
                                                                                                <p>Your order is being prepared for shipping.</p>
                                                                                                {/* <span className={styles.timelineDate}>March 6, 2025</span> */}
                                                                                        </div>
                                                                                </div>

                                                                                <div
                                                                                        className={`${styles.timelineItem} ${orderStatus.status === 'Out-For-Delivery' || orderStatus.status === 'Delivered' ? styles.completed : ''}`}
                                                                                >
                                                                                        <div className={styles.timelineIcon}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck">
                                                                                                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                                                                                                        <path d="M15 18H9" />
                                                                                                        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                                                                                                        <circle cx="17" cy="18" r="2" />
                                                                                                        <circle cx="7" cy="18" r="2" />
                                                                                                </svg>
                                                                                        </div>
                                                                                        <div className={styles.timelineContent}>
                                                                                                <h3>Out for Delivery</h3>
                                                                                                <p>Your order is out for delivery.</p>
                                                                                                {/* <span className={styles.timelineDate}>
                                                                                                        Estimated:
                                                                                                        {new Date(orderStatus.createdAt).toDateString()}
                                                                                                </span> */}
                                                                                        </div>
                                                                                </div>

                                                                                <div className={`${styles.timelineItem} ${orderStatus.status === 'Delivered' ? styles.completed : ''}`}>
                                                                                        <div className={styles.timelineIcon}>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check">
                                                                                                        <circle cx="12" cy="12" r="10" />
                                                                                                        <path d="m9 12 2 2 4-4" />
                                                                                                </svg>
                                                                                        </div>
                                                                                        <div className={styles.timelineContent}>
                                                                                                <h3>Delivered</h3>
                                                                                                <p>Your order has been delivered.</p>
                                                                                                {/* <span className={styles.timelineDate}>
                                                                                                        Estimated:
                                                                                                        {new Date(orderStatus.createdAt).toDateString()}
                                                                                                </span> */}
                                                                                        </div>
                                                                                </div>
                                                                        </div>

                                                                        <div className={styles.orderDetails}>
                                                                                <h3>Order Details</h3>
                                                                                <div className={styles.detailsGrid}>
                                                                                        <div className={styles.detailItem}>
                                                                                                <span className={styles.detailLabel}>Order Number:</span>
                                                                                                <span className={styles.detailValue}>{orderStatus.orderId}</span>
                                                                                        </div>
                                                                                        <div className={styles.detailItem}>
                                                                                                <span className={styles.detailLabel}>Items:</span>
                                                                                                <span className={styles.detailValue}>{orderStatus?.cart?.map((item: any) => item?.name).join(', ')}</span>
                                                                                        </div>
                                                                                        <div className={styles.detailItem}>
                                                                                                <span className={styles.detailLabel}>Shipping Address:</span>
                                                                                                <span className={styles.detailValue}>{`${orderStatus?.user_info?.address}, ${orderStatus?.user_info?.zipCode}`}</span>
                                                                                        </div>
                                                                                        <div className={styles.detailItem}>
                                                                                                <span className={styles.detailLabel}>Estimated Delivery:</span>
                                                                                                <span className={styles.detailValue}>10 days</span>
                                                                                        </div>
                                                                                        {/* <div className={styles.detailItem}>
                                                                                                <span className={styles.detailLabel}>Tracking Number:</span>
                                                                                                <span className={styles.detailValue}>{orderStatus.details.trackingNumber}</span>
                                                                                        </div> */}
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        )}
                                </div>
                        </div>

                        <BlockSpace layout="before-footer" />
                </React.Fragment>

        );
}
