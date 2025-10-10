/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-underscore-dangle */
// react
import React, { useEffect, useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AccountLayout from '~/components/account/AccountLayout';
import AddressCard from '~/components/shared/AddressCard';
import AppLink from '~/components/shared/AppLink';
import AsyncAction from '~/components/shared/AsyncAction';
import url from '~/services/url';
import { accountApi } from '~/api';
import { IAddress } from '~/interfaces/address';
import { useUser } from '~/store/user/userHooks';

function Page() {
    const user = useUser();
    const [addresses, setAddresses] = useState<IAddress[]>([]);

    const delAddress = async (addressId: number) => {
        await accountApi.delAddress(addressId);
        await accountApi.getAddresses(user?._id || '').then(setAddresses);
    };

    useEffect(() => {
        let canceled = false;

        accountApi.getAddresses(user?._id || '').then((result) => {
            if (canceled) {
                return;
            }

            setAddresses(result);
        });

        return () => {
            canceled = true;
        };
    }, []);

    return (
        <div className="addresses-list">
            {/* <PageTitle>{intl.formatMessage({ id: 'HEADER_ADDRESSES' })}</PageTitle> */}

            <AppLink href={url.accountAddressNew()} className="addresses-list__item addresses-list__item--new">
                <div className="addresses-list__plus" />
                <div className="btn btn-secondary btn-sm">
                    <FormattedMessage id="BUTTON_ADD_NEW" />
                </div>
            </AppLink>
            <div className="addresses-list__divider" />

            {addresses.map((address, index) => (
                <React.Fragment key={index}>
                    <AsyncAction
                        action={() => delAddress(address.id)}
                        render={({ run, loading }) => (
                            <AddressCard
                                className="addresses-list__item"
                                address={address}
                                label={address.default ? <FormattedMessage id="TEXT_DEFAULT_ADDRESS" /> : ''}
                                loading={loading}
                                footer={
                                    <React.Fragment>
                                        <AppLink href={url.accountAddressEdit(address)}>
                                            <FormattedMessage id="LINK_EDIT_ADDRESS" />
                                        </AppLink>
                                        &nbsp;&nbsp;
                                        {/* eslint-disable-next-line */}
                                        <AppLink
                                            anchor
                                            onClick={(event) => {
                                                event.preventDefault();
                                                run();
                                            }}
                                        >
                                            <FormattedMessage id="LINK_REMOVE" />
                                        </AppLink>
                                    </React.Fragment>
                                }
                            />
                        )}
                    />

                    <div className="addresses-list__divider" />
                </React.Fragment>
            ))}
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;
