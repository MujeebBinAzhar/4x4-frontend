/* eslint-disable react/jsx-fragments */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-multiple-empty-lines */
// react
import React, { useEffect, useState } from 'react';
// third-party
import classNames from 'classnames';
// application
import BlockHeader from '~/components/blocks/BlockHeader';
import BlockSpace from '~/components/blocks/BlockSpace';
// import PageTitle from '~/components/shared/PageTitle';
import Pagination from '~/components/shared/Pagination';
import { IBlogPageLayout, IBlogPageSidebarPosition } from '~/interfaces/pages';
// data
import axiosInstance from '~/api/api-handler';
import AppLink from '../shared/AppLink';
import url from '~/services/url';

interface Props {
    layout: IBlogPageLayout;
    sidebarPosition: IBlogPageSidebarPosition;
}

interface ShippingAddress {
    _id: string;
    firstName: string;
    lastName: string;
    company: string;
    country: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    email: string;
    phone: string;
    default: boolean;
}

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    shippingAddresses: ShippingAddress[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Post {
    _id: string;
    title: string;
    description: string;
    images: string[];
    status: 'published' | 'draft' | 'archived'; // Adjust statuses as needed
    likesCount: number;
    userId: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const getOrCreateUserId = () => {
    let userId = localStorage.getItem('guest_user_id');
    if (!userId) {
        userId = `guest_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('guest_user_id', userId);
    }
    return userId;
};

export const InstagramPost: React.FC<{
    post: Post;
}> = ({ post }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [likes, setLikes] = useState(post.likesCount);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        getOrCreateUserId();
        const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '{}');
        setLiked(!!likedPosts[post._id]);
    }, [post._id]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === post.images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? post.images.length - 1 : prevIndex - 1));
    };

    const handleLike = () => {
        getOrCreateUserId();
        const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '{}');

        if (liked) {
            setLikes(likes - 1);
            axiosInstance.put(`/build/${post._id}`, {
                likesCount: post.likesCount - 1,
            });
            delete likedPosts[post._id];
        } else {
            setLikes(likes + 1);
            axiosInstance.put(`/build/${post._id}`, {
                likesCount: post.likesCount + 1,
            });
            likedPosts[post._id] = true;
        }

        setLiked(!liked);
        localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
    };

    return (
        <div className="post">
            <div className="post-header">
                <img
                    src={`https://avatar.vercel.sh/rauchg.svg?text=${post.userId.name.slice(0, 2)}`}
                    alt={post.userId.name}
                    width={32}
                    height={32}
                    className="avatar"
                />
                <div className="user-info">
                    <span className="username">{post.userId.name}</span>
                </div>
            </div>
            <div className="post-images">
                <div className="image-container" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                    {post.images.map((image: string, index: number) => (
                        <img
                            key={index}
                            src={image || '/placeholder.svg'}
                            alt={`Post image ${index + 1}`}
                            style={{
                                objectFit: 'cover',
                            }}
                            className="image"
                        />
                    ))}
                </div>
                {post.images.length > 1 && (
                    <>
                        <button className="nav-button left" onClick={prevImage}>
                            {/* <ChevronLeft size={20} /> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-left"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button className="nav-button right" onClick={nextImage}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
            <div className="post-content">
                <div className="actions">
                    <button className="like-button" onClick={handleLike}>
                        {/* <Heart size={24} /> */}
                        {liked ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#cd0e0e"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-heart"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-heart"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        )}
                    </button>
                    <p className="likes-count">{likes.toLocaleString()} likes</p>
                </div>
                <span className="title">{post.title}</span>

                <p className="description">{post.description}</p>
                <div className="post-info">
                    <span className="created-at">Posted on: {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};
function GuestPostPage(props: Props) {
    const { layout } = props;

    const [page, setPage] = useState(1);
    const [blogsData, setBlogsData] = useState<any>(null);

    useEffect(() => {
        let canceled = false;

        axiosInstance.get(`/build`).then((result) => {
            if (canceled) {
                return;
            }

            setBlogsData(result.data);
        });

        return () => {
            canceled = true;
        };
    }, [page]);

    return (
        <React.Fragment>
            <BlockHeader
                pageTitle="Latest Builds"
                breadcrumb={[
                    { title: 'Home', url: '/' },
                    { title: 'Breadcrumb', url: '/' },
                    { title: 'Current Page', url: '/' },
                ]}
            />

            <div className={`block blog-view blog-view--layout--${layout}`}>
                <div className="container">
                    <div className="blog-view__body">
                        <div className="blog-view__item blog-view__item-posts">
                            <div className="block posts-view">
                                <div
                                    className={classNames('posts-view__list', 'posts-list', {
                                        'posts-list--layout--classic': layout === 'classic',
                                        'posts-list--layout--list': layout === 'list',
                                        'posts-list--layout--grid-2': layout === 'grid',
                                    })}
                                >
                                    <div className="instagram-feed">
                                        {blogsData && blogsData?.map((post: any) => <InstagramPost post={post} />)}

                                        {blogsData && blogsData.length === 0 && (
                                            <div className="block">
                                                <div className="container">
                                                    <div className="not-found">
                                                        <div className="not-found__404">Oops! Error 404</div>

                                                        <div className="not-found__content">
                                                            <h1 className="not-found__title">Builds Not Found</h1>

                                                            <p className="not-found__text">
                                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                                We can't seem to find the builds you're looking for.
                                                                <br />
                                                            </p>

                                                            <p className="not-found__text">
                                                                Or go to the home page to start over.
                                                            </p>

                                                            <AppLink
                                                                href={url.home()}
                                                                className="btn btn-secondary btn-sm"
                                                            >
                                                                Go To Home Page
                                                            </AppLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {blogsData && blogsData.length > 0 && (
                                    <div className="posts-view__pagination">
                                        <Pagination
                                            current={page}
                                            siblings={1}
                                            total={blogsData?.pages || 1}
                                            onPageChange={setPage}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default GuestPostPage;

