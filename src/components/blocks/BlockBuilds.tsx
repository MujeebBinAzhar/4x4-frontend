/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-multiple-empty-lines */
// react
import React, { useRef } from 'react';
// third-party
import classNames from 'classnames';
import Slick from 'react-slick';
// application
import AppSlick, { ISlickProps } from '~/components/shared/AppSlick';
import SectionHeader from '~/components/shared/SectionHeader';
import { ILink } from '~/interfaces/link';
import { InstagramPost, Post } from '../blog/GuestPostPage';

export type IBlockBuildsCarouselLayout = 'grid' | 'list';

interface Props {
    blockTitle: React.ReactNode;
    layout: IBlockBuildsCarouselLayout;
    posts: Post[];
    loading?: boolean;
    links?: ILink[];
}

const slickSettings: Record<IBlockBuildsCarouselLayout, ISlickProps> = {
    grid: {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            { breakpoint: 1399, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    },
    list: {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [{ breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1 } }],
    },
};

function BlockBuilds(props: Props) {
    const { blockTitle, layout, posts, loading = false, links = [] } = props;
    const slickRef = useRef<Slick>(null);

    const handleNextClick = () => {
        if (slickRef.current) {
            slickRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (slickRef.current) {
            slickRef.current.slickPrev();
        }
    };

    const rootClasses = classNames('block', 'block-posts-carousel', `block-posts-carousel--layout--${layout}`, {
        'block-posts-carousel--loading': loading,
    });

    return (
        <div className={rootClasses}>
            <div className="container">
                <SectionHeader
                    sectionTitle={blockTitle}
                    arrows
                    links={links}
                    onNext={handleNextClick}
                    onPrev={handlePrevClick}
                />
                <div
                    className={classNames('block-posts-carousel__carousel', {
                        'block-posts-carousel__carousel--has-items': posts?.length > 0,
                    })}
                >
                    <div className="block-posts-carousel__carousel-loader" />

                    <AppSlick ref={slickRef} {...slickSettings[layout]}>
                        {posts?.map((post) => (
                            <div
                                key={post._id}
                                className="block-posts-carousel__item instagram-feed"
                                style={{ minHeight: '10vh' }}
                            >
                                <InstagramPost post={post} />
                            </div>
                        ))}
                    </AppSlick>
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockBuilds);

