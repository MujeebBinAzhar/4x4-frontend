/* eslint-disable no-multiple-empty-lines */
// react
import React from 'react';
// application
import { GetServerSideProps } from 'next';
// import AppImage from '~/components/shared/AppImage';
import BlockReviews from '~/components/blocks/BlockReviews';
import BlockSpace from '~/components/blocks/BlockSpace';
import BlockTeammates from '~/components/blocks/BlockTeammates';
import Decor from '~/components/shared/Decor';
import { baseUrl } from '~/services/utils';
import { ISeo } from '~/interfaces/product';
import { shopApi } from '~/api';
import PageTitle from '~/components/shared/PageTitle';

interface Props {
    seo: ISeo;
    origin: string;
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const protocol = req.headers['x-forwarded-proto'] || (req.connection as any).encrypted ? 'https' : 'http';

    const { host } = req.headers;
    const seo = await shopApi.getPageSeo('about');
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
                title="About"
                metaTitle={metaTitle || ''}
                url={`${origin}/about-us`}
                type="page"
            />

            <div className="about">
                <div className="about__body">
                    <div className="about__image">
                        <div
                            className="about__image-bg"
                            style={{
                                backgroundImage: `url(${baseUrl('/images/about.jpg')})`,
                            }}
                        />
                        <Decor className="about__image-decor" type="bottom" />
                    </div>

                    <div className="about__card">
                        <div className="about__card-title">About Us</div>
                        <div className="about__card-text">
                            All4x4 is an international company with 30 years of history selling spare parts for cars,
                            trucks and motorcycles. During our work we managed to create a unique service for the sale
                            and delivery of spare parts around the world.
                        </div>
                        <div className="about__card-author">Ryan Ford, CEO All4x4</div>
                        <div className="about__card-signature">
                            {/* <AppImage src="/images/signature.jpg" width="160" height="55" /> */}
                        </div>
                    </div>

                    <div className="about__indicators">
                        <div className="about__indicators-body">
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">350</div>
                                <div className="about__indicators-item-title">Stores around the world</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">80 000</div>
                                <div className="about__indicators-item-title">Original auto parts</div>
                            </div>
                            <div className="about__indicators-item">
                                <div className="about__indicators-item-value">5 000</div>
                                <div className="about__indicators-item-title">Satisfied customers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="divider-xl" />

            <BlockTeammates />

            <BlockSpace layout="divider-xl" />

            <BlockReviews />

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;

