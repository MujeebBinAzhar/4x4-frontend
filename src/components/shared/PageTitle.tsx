/* eslint-disable object-curly-newline */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-one-expression-per-line */
// react
import React from 'react';
// third-party
import Head from 'next/head';

interface Props {
    metaTitle: string;
    description?: string;
    keywords?: string[];
    title: string;
    type?: string;
    url?: string;
}

function PageTitle(props: Props) {
    const { metaTitle, description, keywords, title, type, url } = props;

    return (
        <Head>
            <title>{title} | All 4x4</title>
            <meta name="description" content={description || 'Shop the best products on our store.'} />
            <meta name="keywords" content={keywords?.join(', ')} />
            <meta property="og:title" content={metaTitle || title || 'Home'} />
            <meta property="og:description" content={description || 'Shop the best products on our store.'} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
        </Head>
    );
}

export default PageTitle;

