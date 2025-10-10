/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-unused-prop-types */
// react
import React from 'react';
// third-party
import classNames from 'classnames';
// application
import AppLink from '~/components/shared/AppLink';
import BlockSpace from '~/components/blocks/BlockSpace';
import Decor from '~/components/shared/Decor';
import Post from '~/components/blog/Post';
import { baseUrl } from '~/services/utils';
import { IBlogPageSidebarPosition } from '~/interfaces/pages';
import { IPost } from '~/interfaces/post';

interface Props {
    blog?: IPost;
    featuredImage?: boolean;
    sidebarPosition?: IBlogPageSidebarPosition | false;
}

function BlogPagePost(props: Props) {
    const { featuredImage = false, blog } = props;

    return (
        <React.Fragment>
            <div className="block post-view">
                <div
                    className={classNames('post-view__header post-header', {
                        'post-header--has-image': featuredImage,
                    })}
                >
                    {featuredImage && (
                        <div
                            className="post-header__image"
                            style={{
                                backgroundImage: `url(${
                                    blog?.blogImage ? blog?.blogImage : baseUrl('/images/posts/post-1.jpg')
                                })`,
                            }}
                        />
                    )}

                    <div className="post-header__body">
                        <div className="post-header__categories">
                            <ul className="post-header__categories-list">
                                <li className="post-header__categories-item">
                                    <AppLink href="/" className="post-header__categories-link">
                                        Latest News
                                    </AppLink>
                                </li>
                            </ul>
                        </div>
                        <h1 className="post-header__title">{blog?.title}</h1>
                        <div className="post-header__meta">
                            <ul className="post-header__meta-list">
                                <li className="post-header__meta-item">
                                    {'By '}
                                    <AppLink href="/" className="post-header__meta-link">
                                        Andrew
                                    </AppLink>
                                </li>
                                <li className="post-header__meta-item">{blog?.createdAt}</li>
                                <li className="post-header__meta-item">
                                    <AppLink href="/" className="post-header__meta-link">
                                        4 Comments
                                    </AppLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Decor type="bottom" className="post-header__decor" />
                </div>

                <div className="container">
                    <div className="post-view__body">
                        {/* {sidebarPosition === 'start' && (
                            <div className="post-view__item post-view__item-sidebar">
                                <BlogSidebar />
                            </div>
                        )} */}
                        <Post description={blog?.description || ''} className="post-view__item post-view__item-post" />
                        {/* {sidebarPosition === 'end' && (
                            <div className="post-view__item post-view__item-sidebar">
                                <BlogSidebar />
                            </div>
                        )} */}
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default BlogPagePost;

