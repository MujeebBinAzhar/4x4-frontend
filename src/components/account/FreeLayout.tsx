/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
// react
import React, { PropsWithChildren } from 'react';
// third-party

import Redirect from '~/components/shared/Redirect';

import { useUser } from '~/store/user/userHooks';

interface Props extends PropsWithChildren<{}> {}

function FreeLayout(props: Props) {
    const { children } = props;

    const user = useUser();

    if (user) {
        return <Redirect href="/account/builds" />;
    }

    return children;
}

export default FreeLayout;

