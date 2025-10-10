/* eslint-disable no-multiple-empty-lines */
/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { BlogApi, IGetBlogCategoriesOptions } from '~/api/base';
import { getBlogCategories, getLatestPosts, getSingalBlog } from '~/fake-server/endpoints';
import { IBlogCategory } from '~/interfaces/category';
import { IPost } from '~/interfaces/post';

export class FakeBlogApi extends BlogApi {
    getLatestPosts(limit: number, page: number): Promise<IPost[]> {
        return getLatestPosts(limit, page);
    }

    getBlogById(id: string): Promise<IPost> {
        return getSingalBlog(id);
    }

    getCategories(options: IGetBlogCategoriesOptions): Promise<IBlogCategory[]> {
        return getBlogCategories(options);
    }
}

