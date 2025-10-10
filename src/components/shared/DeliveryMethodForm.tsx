/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
// react
import React, { useEffect, useMemo, useState } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
// application
import axios from 'axios';
import { useStore } from 'react-redux';
import { countriesApi } from '~/api';
import { ICountry } from '~/interfaces/country';
import { useDetachableForm } from '~/services/hooks';
import { AppDispatch } from '~/store/types';
import { CART_UPDATE_SHIPPING } from '~/store/cart/cartActionTypes';
import { useCart } from '~/store/cart/cartHooks';

export interface IDeliveryForm {
    method: string;
    serviceName: string;
    serviceOption: string;
    endPrice: number;
}

interface Props {
    namespace?: string;
    disabled?: boolean;
    idPrefix?: string;
}

export function getDeliveryFromDefaultValue(initialData: IDeliveryForm | null = null): IDeliveryForm {
    return {
        method: '',
        serviceName: '',
        serviceOption: '',
        endPrice: 0,
        ...initialData,
    };
}

function DeliveryForm(props: Props) {
    const { disabled, idPrefix, namespace } = props;
    const intl = useIntl();
    const formMethods = useFormContext();
    const { errors: errorsProps } = formMethods.formState;
    const errors = namespace ? errorsProps[namespace] : errorsProps;
    const ns = useMemo(() => (namespace ? `${namespace}.` : ''), [namespace]);
    const cart = useCart();

    const store = useStore();
    const dispatch = store.dispatch as AppDispatch;

    const fieldId = idPrefix ? `${idPrefix}-` : '';
    const [countries, setCountries] = useState<ICountry[] | null>(null);
    const register = useDetachableForm(formMethods, disabled || false);
    const { watch, setValue } = useFormContext();

    const currentMethod = watch(`${ns}method`);
    const [deliveryOptions, setDeliveryOptions] = useState<any>([]);
    const currentServiceOption = watch(`${ns}serviceName`);

    const shipToDifferentAddress = watch('shipToDifferentAddress');
    const billingAddress = watch('billingAddress');
    const shippingAddress = watch('shippingAddress');

    useEffect(() => {
        const findValue = deliveryOptions?.service?.find((item: any) => item.code === currentServiceOption);
        formMethods.setValue(`${ns}endPrice`, findValue?.price);
        dispatch({
            type: CART_UPDATE_SHIPPING,
            shipping: parseInt(findValue?.price, 10) * cart.items.length || 0, // Replace this with the actual shipping rate
        });
    }, [currentServiceOption, deliveryOptions]);

    useEffect(() => {
        setValue(`${ns}method`, '');
        setDeliveryOptions([]);
        setValue(`${ns}serviceName`, '');
        setValue(`${ns}serviceOption`, '');
    }, [billingAddress.postcode, shippingAddress.postcode]);
    useEffect(() => {
        if (!currentMethod) return;

        const fetchDeliveryOptions = async () => {
            const cartProducts = cart.items.map((item) => item.product.id);

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_REST_API_BASE_ENDPOINT}/shipping-rate-calculator`,
                    {
                        cartProducts,
                        postcode: shipToDifferentAddress ? shippingAddress?.postcode : billingAddress?.postcode,
                    },
                );
                if (response.data) {
                    // eslint-disable-next-line max-len
                    setDeliveryOptions(response.data?.services || []); // Assume `options` is the key in the API response
                } else {
                    setDeliveryOptions([]);
                }
            } catch (error) {
                setDeliveryOptions([]);
            }
        };

        fetchDeliveryOptions();
    }, [currentMethod]);
    // Load countries.
    useEffect(() => {
        let canceled = false;

        countriesApi.getCountries().then((result) => {
            if (canceled) {
                return;
            }

            setCountries(result);
        });

        return () => {
            canceled = true;
        };
    }, []);

    if (countries === null) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={`${fieldId}method`}>
                    <FormattedMessage id="Delivery Method" />
                </label>
                <select
                    id={`${fieldId}method`}
                    className={classNames('form-control', {
                        'is-invalid': errors?.method,
                    })}
                    disabled={disabled}
                    {...register(`${ns}method`, { required: true })}
                >
                    <option value="">Select delivery method</option>
                    {countries &&
                        ['Australia Post'].map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.method?.type === 'required' && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            {deliveryOptions?.service && (
                <div className="form-group">
                    <label htmlFor={`${fieldId}serviceName`}>
                        <FormattedMessage id="Service Name" />
                    </label>
                    <select
                        id={`${fieldId}serviceName`}
                        className={classNames('form-control', {
                            'is-invalid': errors?.serviceName,
                        })}
                        disabled={disabled}
                        {...register(`${ns}serviceName`, { required: true })}
                    >
                        <option value="">{intl.formatMessage({ id: 'Select Service type' })}</option>

                        {deliveryOptions?.service?.map((item: any) => (
                            <option key={item?.code} value={item?.code}>
                                {item?.name}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">
                        {errors?.serviceName?.type === 'required' && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                    </div>
                </div>
            )}

            {currentServiceOption && (
                <div className="form-group">
                    <label htmlFor={`${fieldId}serviceOption`}>
                        <FormattedMessage id="Service Option" />
                    </label>
                    <select
                        id={`${fieldId}serviceOption`}
                        className={classNames('form-control', {
                            'is-invalid': errors?.serviceOption,
                        })}
                        disabled={disabled}
                        {...register(`${ns}serviceOption`, { required: true })}
                    >
                        <option value="">{intl.formatMessage({ id: 'Select Service option' })}</option>

                        {deliveryOptions?.service
                            ?.filter((it: any) => it.code === currentServiceOption)?.[0]
                            ?.options?.option?.map((item: any) => (
                                <option key={item?.code} value={item?.code}>
                                    {item?.name}
                                </option>
                            ))}
                    </select>
                    <div className="invalid-feedback">
                        {errors?.serviceOption?.type === 'required' && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default DeliveryForm;
