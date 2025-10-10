/* eslint-disable no-multiple-empty-lines */
// application
import slugify from 'react-slugify';
import { blogCategoriesTree } from '~/fake-server/database/categories';
import { clone } from '~/fake-server/utils';
import { IBaseCategory, IBlogCategory, IShopCategory } from '~/interfaces/category';
import { IGetBlogCategoriesOptions, IGetCategoriesOptions, IGetCategoryBySlugOptions } from '~/api/base';
import axiosInstance from '~/api/api-handler';

function transformCategoriesToShopCategory(data: any[]): IShopCategory[] {
    return data.map((category) => {
        // Find the parent category by matching parentId to _id in the data array
        // eslint-disable-next-line no-underscore-dangle
        const parent = data.find((item) => item?._id?.toString() === category?.parentId?.toString());

        return {
            // eslint-disable-next-line no-underscore-dangle
            id: parseInt(category?._id, 16), // Convert ObjectId to integer
            type: 'shop',
            name: category.name.en,
            slug: slugify(category.name.en), // Generate slug from name
            image: category.icon || null,
            items: category.children?.length || 0, // Number of children
            // eslint-disable-next-line max-len
            parent: parent ? transformCategoriesToShopCategory([parent])[0] : null, // Look up and transform parent category
            // eslint-disable-next-line max-len
            children: transformCategoriesToShopCategory(category.children || []), // Recursive transformation with current category as parent
            layout: 'categories', // Assuming default layout is 'categories'
            customFields: {}, // Replace with your logic if custom fields are needed
        };
    });
}
export function prepareCategory<T extends IBaseCategory>(category: T, depth?: number): T {
    let children;

    if (depth && depth > 0) {
        children = (category.children || []).map((x) => prepareCategory(x, depth - 1));
    }

    let parent;

    if (category.parent) {
        parent = prepareCategory(category.parent);
    } else if (category.parent === null) {
        parent = null;
    }

    return JSON.parse(
        JSON.stringify({
            ...category,
            parent,
            children,
        }),
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCategoryBySlug(slug: string, options?: IGetCategoryBySlugOptions): Promise<IShopCategory> {
    // const optionsValue = options || {};

    // const category = shopCategoriesList.find((x) => x.slug === slug);

    // if (!category) {
    //     return error('Page Not Found');
    // }

    // return Promise.resolve(prepareCategory(category, optionsValue.depth));
    try {
        const response = await axiosInstance.get<IShopCategory[]>(`/categories/${slug}`, {});
        return transformCategoriesToShopCategory([response.data])[0] as IShopCategory; // Typed response
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw error;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getCategories(options?: IGetCategoriesOptions): Promise<IShopCategory[]> {
    // let categories = shopCategoriesTree.slice(0);
    // const depth = options?.depth || 0;
    // const optionParent = options?.parent;
    // const optionSlugs = options?.slugs;
    // console.log(categories, depth, optionParent, optionSlugs);

    // if (optionParent) {
    //     const parent = shopCategoriesList.find((x) => x.slug === optionParent.slug);

    //     if (parent) {
    //         categories = parent.children || [];
    //     }
    // } else if (optionSlugs) {
    //     categories = shopCategoriesList.filter((x) => optionSlugs.includes(x.slug));
    // }

    // categories = categories.map((x) => prepareCategory(x, depth));

    // return Promise.resolve(clone(categories));
    try {
        const response = await axiosInstance.get<IShopCategory[]>('/categories', {});
        return transformCategoriesToShopCategory(response.data) as IShopCategory[]; // Typed response
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw error;
    }
}

export function getBlogCategories(options: IGetBlogCategoriesOptions): Promise<IBlogCategory[]> {
    let categories = blogCategoriesTree.slice(0);
    const depth = options.depth || 0;

    categories = categories.map((x) => prepareCategory(x, depth));

    return Promise.resolve(clone(categories));
}

