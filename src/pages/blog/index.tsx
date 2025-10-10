// react
import { GetServerSideProps } from 'next';
import React from 'react';
import { shopApi } from '~/api';
// application
import BlogPageCategory from '~/components/blog/BlogPageCategory';
import PageTitle from '~/components/shared/PageTitle';
import { ISeo } from '~/interfaces/product';

interface Props {
    seo: ISeo;
    origin: string;
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    const { host } = req.headers;
    const seo = await shopApi.getPageSeo('blog');
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
    return (
        <React.Fragment>
            <PageTitle
                description={metaDescription || ''}
                keywords={metaKeywords || []}
                title="Blog"
                metaTitle={metaTitle || ''}
                url={`${origin}/blog`}
                type="page"
            />
            <BlogPageCategory layout="classic" sidebarPosition="end" />
        </React.Fragment>
    );
}

export default Page;
