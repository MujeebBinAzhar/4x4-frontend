/* eslint-disable no-multiple-empty-lines */
/* eslint-disable import/prefer-default-export */

// application
import { delayResponse, error } from '~/fake-server/utils';
import { IPost } from '~/interfaces/post';
import axiosInstance from '~/api/api-handler';

export async function getLatestPosts(limit: number, page: number): Promise<IPost[]> {
    try {
        // Make the API request
        const response = await axiosInstance.get('/blog', {
            params: {
                limit,
                page,
            },
        });
        return response.data as IPost[];
    } catch (e) {
        return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
    }
}
export async function getSingalBlog(id: string): Promise<IPost> {
    try {
        // Make the API request
        const response = await axiosInstance.get(`/blog/${id}`);
        console.log(response);
        return response.data as IPost;
    } catch (e) {
        console.log(e);
        return delayResponse(() => error('AUTH_WRONG_PASSWORD'));
    }
}

