/* eslint-disable no-multiple-empty-lines */
export interface IPost {
    id: number;
    _id?: string;
    title: string;
    image: string;
    categories: string[];
    date: string;
    createdAt?: string;
    blogImage?: string;
    description?: string;
    tags?: string[];
    slug?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    metaTitle?: string;
}

