/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppImage from '~/components/shared/AppImage';
import AppLink from '~/components/shared/AppLink';
import url from '~/services/url';
import { IPost } from '~/interfaces/post';

export type IPostCardLayout = 'list' | 'grid' | 'grid-sm';

interface Props {
    post: IPost;
    layout?: IPostCardLayout;
}

function PostCard(props: Props) {
    const { post, layout } = props;

    const rootClasses = classNames('post-card', {
        [`post-card--layout--${layout}`]: layout,
    });
    function sanitizeText(input: string) {
        if (typeof input !== 'string') return '';

        // Remove HTML tags using regex
        return input.replace(/<[^>]*>/g, '').trim();
    }

    return (
        <div className={rootClasses}>
            <div className="post-card__image">
                <AppLink href={url.post(post)}>
                    <AppImage src={post?.blogImage} />
                </AppLink>
            </div>
            <div className="post-card__content">
                <div className="post-card__category">
                    {post?.tags?.map((tag: string) => {
                        return tag;
                    })}
                </div>
                <div className="post-card__title">
                    <h2>
                        <AppLink href={url.post(post)}>{post.title}</AppLink>
                    </h2>
                </div>
                <div className="post-card__date">
                    {' By '}
                    <AppLink href="/">Andrew</AppLink>
                    {' on '}
                    {post?.createdAt}
                </div>
                <div className="post-card__excerpt">
                    <div className="typography">{sanitizeText(post?.description || '').slice(0, 300)}...</div>
                </div>
                <div className="post-card__more">
                    <AppLink href={url.post(post)} className="btn btn-secondary btn-sm">
                        Read more
                    </AppLink>
                </div>
            </div>
        </div>
    );
}

export default PostCard;

