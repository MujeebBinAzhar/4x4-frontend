/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-multiple-empty-lines */
// react
import React, { useEffect, useRef, useState } from 'react';
// third-party
// application
import Image from 'next/image';
import classNames from 'classnames';
import axios from 'axios';
import { toast } from 'react-toastify';
import AccountLayout from '~/components/account/AccountLayout';
import AsyncAction from '~/components/shared/AsyncAction';
import axiosInstance from '~/api/api-handler';
import { useUser } from '~/store/user/userHooks';

function Page() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [title, setTitle] = useState('');
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [myBuild, setmyBuild] = useState<
        {
            _id: string;
            title: string;
            description: string;
            images: string[];
            status: 'published' | 'draft' | 'archived'; // Adjust statuses as needed
            likesCount: number;
            userId: string;
            createdAt: string;
            updatedAt: string;
        }[]
    >([]);
    const [imagesUrl, setimagesUrl] = useState<string[]>([]);
    const getMyBuild = async () => {
        const res = await axiosInstance.get(`/build/?userId=${user?._id}`);
        if (res.data) {
            setmyBuild(res.data);
        }
    };
    useEffect(() => {
        getMyBuild();

        return () => { };
    }, [user?._id]);

    const handleAddPost = async () => {
        await axiosInstance.post('/build/add', {
            title,
            description,
            images: imagesUrl,
            userId: user?._id || '',
        }).then(() => {
            toast.success('Build added successfully');
        }).catch(() => {
            toast.error('Failed to add build');
        });
        setTitle('');
        setDescription('');
        setimagesUrl([]);
        setImages([]);
        setPreviews([]);
        setLoading(false);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(filesArray);
            filesArray.forEach((file) => {
                const formData = new FormData();
                formData.append('images', file);

                const username = process.env.NEXT_PUBLIC_USER_NAME;
                const password = process.env.NEXT_PUBLIC_PASSWORD;
                const credentials = btoa(`${username}:${password}`);
                axios({
                    url: `${process.env.NEXT_PUBLIC_IMAGES_SERVER}/upload`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Basic ${credentials}`,
                    },
                    data: formData,
                })
                    .then((res) => {
                        console.log(res);
                        setimagesUrl((imgUrl) => [
                            ...imgUrl,
                            `${process.env.NEXT_PUBLIC_IMAGES_SERVER}/images/${res?.data?.files[0]?.filename}`,
                        ]);
                    })

                    .catch(() => {
                        setLoading(false);
                    });
            });

            const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
            setPreviews(previewsArray);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        handleAddPost();
    };

    return (
        <div className="card">
            {/* <PageTitle>{intl.formatMessage({ id: 'HEADER_GARAGE' })}</PageTitle> */}

            {myBuild.length > 0 && (
                <React.Fragment>
                    <div className="card-header">
                        <h5>My Builds</h5>
                    </div>
                    <div className="card-divider" />
                    {/*
                    <div className="card-body card-body--padding--2">
                        <div className="vehicles-list vehicles-list--layout--account">
                            <div className="vehicles-list__body">
                                {myBuild.map((vehicle, index) => (
                                    <InstagramPost post={vehicle} key={index} />
                                ))}
                            </div>
                        </div>
                    </div> */}
                    <div className="card-divider" />
                </React.Fragment>
            )}
            <div className="card-header">
                <h5>Add Build</h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <form onSubmit={handleSubmit} className="guest-post-form">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                            Images
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="images"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    {previews.length > 0 && (
                        <div className="image-previews mb-3">
                            {previews.map((preview, index) => (
                                <div key={index} className="preview-container">
                                    <Image
                                        src={preview || '/placeholder.svg'}
                                        alt={`Preview ${index + 1}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <button ref={buttonRef} type="submit" className="btn btn-primary hidden">
                        Submit
                    </button>
                </form>

                <div className="mt-4 pt-3">
                    <AsyncAction
                        action={() =>
                            title && description && images.length > 0 && buttonRef.current
                                ? Promise.resolve(buttonRef.current.click())
                                : Promise.resolve()
                        }
                        render={({ run }) => (
                            <button
                                type="button"
                                className={classNames('btn', 'btn-primary', {
                                    'btn-loading': loading,
                                })}
                                disabled={!(title && description && images.length > 0)}
                                onClick={run}
                            >
                                Add Build
                            </button>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;

