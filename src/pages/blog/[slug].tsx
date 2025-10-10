/* eslint-disable no-multiple-empty-lines */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
// react
import React from 'react';
// application

// third-party
import { GetServerSideProps } from 'next';
// application
import Head from 'next/head';
import BlogPagePost from '~/components/blog/BlogPagePost';
import { blogApi } from '~/api';
import SitePageNotFound from '~/components/site/SitePageNotFound';
import { IPost } from '~/interfaces/post';

interface Props {
    post: IPost | null;
    origin: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
    const slug = typeof params?.slug === 'string' ? params?.slug : null;
    const post = slug ? await blogApi.getBlogById(slug) : null;
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    // Get the host (domain and port)
    const { host } = req.headers;

    // Construct the origin (protocol + host)
    const origin = `${protocol}://${host}`;

    return {
        props: {
            post,
            origin,
        },
    };
};

function Page(props: Props) {
    const { post, origin } = props;
    if (post === null || !post) {
        return <SitePageNotFound />;
    }

    const { title, metaDescription, metaKeywords, metaTitle } = post;
    const parseKeywords = metaKeywords || [];
    return (
        <React.Fragment>
            <Head>
                <title>{title} - Blog | All 4x4</title>
                <meta name="description" content={metaDescription || 'Shop the best products on our store.'} />
                <meta name="keywords" content={parseKeywords.join(', ')} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription || 'Shop the best products on our store.'} />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content={`${origin}/blog/${post.slug}`} />
                {post.blogImage ? (
                    <meta property="og:image" content={post.blogImage || `${origin}/images/products/product-1-1.jpg`} />
                ) : (
                    <meta property="og:image" content={`${origin}/images/products/product-1-1.jpg`} />
                )}
            </Head>
            <BlogPagePost featuredImage blog={post} />
        </React.Fragment>
    );
}

export default Page;

