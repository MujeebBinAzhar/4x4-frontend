/* eslint-disable max-len */
/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */

// react
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
// application
import { GetServerSideProps } from 'next';
import {
    Elements, useElements, useStripe, PaymentElement, LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, {
    useState, forwardRef, useImperativeHandle, useEffect, useRef,
} from 'react';
import AppLink from '~/components/shared/AppLink';
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
import Checkbox from '~/components/shared/Checkbox';
import CheckoutCart from '~/components/shop/CheckoutCart';
import CheckoutForm from '~/components/shop/CheckoutForm';
import PageTitle from '~/components/shared/PageTitle';
import url from '~/services/url';
import { getAddressFormDefaultValue, IAddressForm } from '~/components/shared/AddressForm';
import { getRegisterFormDefaultValue, IRegisterForm } from '~/components/shared/RegisterForm';
import { ICheckoutData } from '~/api/base';
import { accountApi, shopApi } from '~/api';
import { useAsyncAction } from '~/store/hooks';
import { useCart } from '~/store/cart/cartHooks';
import { useUser, useUserSignUp } from '~/store/user/userHooks';
import DeliveryForm, { getDeliveryFromDefaultValue, IDeliveryForm } from '~/components/shared/DeliveryMethodForm';
import { ISeo } from '~/interfaces/product';

interface IForm {
    billingAddress: IAddressForm;
    createAccount: boolean;
    account: IRegisterForm;
    shipToDifferentAddress: boolean;
    shippingAddress: IAddressForm;
    comment: string;
    payment: string;
    agree: boolean;
    deliveryMethod: IDeliveryForm;
}

interface Props {
    seo: ISeo;
    origin: string;
}

const LocalCheckoutForm = forwardRef(({ setIsLoading }: { setIsLoading: (e: boolean) => void }, ref) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string>('');
    const { watch } = useFormContext();
    const billingAddress = watch('billingAddress');
    const shippingAddress = watch('shippingAddress');

    const handleSubmit = async (e: any) => {
        // if (e) e?.preventDefault(); // Prevent default form submission if called directly

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: e,
            },
        });

        if (error) {
            setMessage(error?.message || 'An unexpected error occurred. Please try again.');
        } else {
            toast.success('Payment successful');
        }

        setIsLoading(false);
    };

    // Expose the handleSubmit function to the parent
    useImperativeHandle(ref, () => ({
        triggerSubmit: handleSubmit,
    }));

    return (
        <form id="payment-form">
            <LinkAuthenticationElement options={{ defaultValues: { email: billingAddress?.email || shippingAddress.email || '' } }} id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    const { host } = req.headers;
    const seo = await shopApi.getPageSeo('checkout');
    const origin = `${protocol}://${host}`;

    return {
        props: {
            seo,
            origin,
        },
    };
};
function Page(props: Props) {
    const checkoutFormRef = useRef<{ triggerSubmit: (e: string) => void }>(null);
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');

    const stripePromise = loadStripe('pk_test_51Nb3sDH0U1Qye65scQ9lPNDGtG407KlXmSCGswfIuRl8uCDtLNwze9lkUT0WNeA0mcgQnY3yiyy0d4ep3U9hzYDz00GzwVa9f8');

    const { origin, seo } = props;
    const { metaDescription, metaKeywords, metaTitle }: ISeo = seo;
    const intl = useIntl();
    const user = useUser();
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const userSignUp = useUserSignUp();
    const cart = useCart();
    const formMethods = useForm<IForm>({
        defaultValues: {
            billingAddress: getAddressFormDefaultValue(),
            createAccount: false,
            account: getRegisterFormDefaultValue(),
            shipToDifferentAddress: false,
            shippingAddress: getAddressFormDefaultValue(),
            comment: '',
            payment: 'stripe',
            deliveryMethod: getDeliveryFromDefaultValue(),
        },
    });
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = formMethods;
    const [checkout] = useAsyncAction(
        async (data: IForm) => {
            setShowLoader(true);
            const { billingAddress } = data;
            const shippingAddress = data.shipToDifferentAddress ? data.shippingAddress : data.billingAddress;

            const checkoutData: ICheckoutData = {
                payment: data.payment,
                items: cart.items.map((item) => ({
                    productId: item.product.id,
                    options: item.options.map((option) => ({
                        name: option.name,
                        value: option.value,
                    })),
                    quantity: item.quantity,
                })),
                billingAddress,
                shippingAddress,
                comment: data.comment,
                deliveryMethod: data.deliveryMethod,
            };

            if (data.createAccount) {
                try {
                    await userSignUp(data.billingAddress.firstName, data.account.email, data.account.password);
                } catch (error) {
                    if (error instanceof Error) {
                        setShowLoader(false);
                        toast.error(intl.formatMessage({ id: `ERROR_API_${error.message}` }));
                    }

                    return;
                }
            }

            const order = await shopApi.checkout({
                ...checkoutData,
                shipping: cart.shipping || 0,
                userId: user?._id || '',
                shipToDifferentAddress: data.shipToDifferentAddress,
            });
            if (checkoutFormRef.current) {
                checkoutFormRef.current.triggerSubmit(`${window.origin}/cart/checkout/${order?._id}`);
            }
            // await router.push(url);
        },
        [intl, cart, userSignUp, router],
    );

    const fetchPaymentIntent = async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_REST_API_BASE_ENDPOINT}/website/order/create-payment-intent`,
            {
                total: cart.total,
                cardInfo: {},
            },
        );
        if (response.data) {
            setClientSecret(response.data?.client_secret);
        } else {
            toast.error('Failed to fetch payment intent');
        }
    };
    useEffect(() => {
        if (cart.stateFrom === 'client' && cart.items.length < 1) {
            router.replace(url.cart()).then();
        }
        if (user?._id) {
            accountApi.getDefaultAddress(user?._id || '').then((res) => {
                if (res) {
                    setValue('billingAddress', res);
                }
                if (res) {
                    setValue('shippingAddress', res);
                }
            });
        }
        if (cart.total && cart.total > 0) {
            fetchPaymentIntent();
        }
    }, [cart.stateFrom, cart.items.length, router, cart, cart.total]);

    if (cart.items.length < 1) {
        return null;
    }

    const { ref: agreeRef, ...agreeProps } = register('agree', { required: true });

    return (
        <React.Fragment>
            <PageTitle
                description={metaDescription || ''}
                keywords={metaKeywords || []}
                title="Checkout"
                metaTitle={metaTitle || ''}
                url={`${origin}/cart/checkout`}
                type="page"
            />
            <BlockHeader
                pageTitle={<FormattedMessage id="HEADER_CHECKOUT" />}
                breadcrumb={[
                    { title: <FormattedMessage id="LINK_HOME" />, url: url.home() },
                    { title: <FormattedMessage id="LINK_CART" />, url: url.cart() },
                    { title: <FormattedMessage id="LINK_CHECKOUT" />, url: url.checkout() },
                ]}
            />

            <FormProvider {...formMethods}>
                <form className="checkout block" onSubmit={handleSubmit(checkout)}>
                    <div className="container container--max--xl">
                        <div className="row">
                            {!user && (
                                <div className="col-12 mb-3">
                                    <div className="alert alert-lg alert-primary">
                                        <FormattedMessage
                                            id="TEXT_ALERT_RETURNING_CUSTOMER"
                                            values={{
                                                link: (
                                                    <AppLink href={url.signIn()}>
                                                        <FormattedMessage id="TEXT_ALERT_RETURNING_CUSTOMER_LINK" />
                                                    </AppLink>
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="col-12 col-lg-6 col-xl-7">
                                <div className="card mb-lg-0">
                                    <div className="card-body card-body--padding--2">
                                        <CheckoutForm />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                                <div className="card mb-0">
                                    <div className="card-body card-body--padding--2">
                                        <h3 className="card-title">
                                            <FormattedMessage id="HEADER_YOUR_ORDER" />
                                        </h3>

                                        <CheckoutCart />

                                        {/* <CheckoutPayments /> */}
                                        <DeliveryForm namespace="deliveryMethod" idPrefix="checkout-delivery-form" />

                                        {clientSecret && stripePromise && (
                                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                <LocalCheckoutForm setIsLoading={(e) => setShowLoader(e)} ref={checkoutFormRef} />
                                                <div className="checkout__agree form-group">
                                                    <div className="form-check">
                                                        <Checkbox
                                                            id="checkout-form-agree"
                                                            className={classNames('form-check-input', {
                                                                'is-invalid': errors.agree,
                                                            })}
                                                            inputRef={agreeRef}
                                                            {...agreeProps}
                                                        />
                                                        <label className="form-check-label" htmlFor="checkout-form-agree">
                                                            <FormattedMessage
                                                                id="INPUT_TERMS_AGREE_LABEL"
                                                                values={{
                                                                    link: (
                                                                        <AppLink href={url.pageTerms()} target="_blank">
                                                                            <FormattedMessage id="INPUT_TERMS_AGREE_LABEL_LINK" />
                                                                        </AppLink>
                                                                    ),
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className={classNames('btn', 'btn-primary', 'btn-xl', 'btn-block', {
                                                        'btn-loading': showLoader,
                                                    })}
                                                >
                                                    <FormattedMessage id="BUTTON_PLACE_ORDER" />
                                                </button>
                                            </Elements>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
