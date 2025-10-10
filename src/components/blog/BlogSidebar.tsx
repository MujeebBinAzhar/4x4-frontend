/* eslint-disable no-return-await */
/* eslint-disable no-multiple-empty-lines */
// react
import React, { useEffect, useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import WidgetAboutUs from '~/components/widgets/WidgetAboutUs';
import WidgetCategories from '~/components/widgets/WidgetCategories';
import WidgetNewsletter from '~/components/widgets/WidgetNewsletter';
import WidgetPosts from '~/components/widgets/WidgetPosts';
import WidgetSearch from '~/components/widgets/WidgetSearch';
import WidgetTags from '~/components/widgets/WidgetTags';
import { blogApi } from '~/api';
import { ICategory } from '~/interfaces/category';
// data

function BlogSidebar() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [blogsData, setBlogsData] = useState<any>(null);

    useEffect(() => {
        let canceled = false;

        blogApi.getLatestPosts(4, 1).then((result) => {
            if (canceled) {
                return;
            }

            setBlogsData(result);
        });

        return () => {
            canceled = true;
        };
    }, []);

    useEffect(() => {
        let canceled = false;

        blogApi.getCategories({ depth: 1 }).then((result) => {
            if (canceled) {
                return;
            }

            setCategories(result);
        });

        return () => {
            canceled = true;
        };
    }, []);

    return (
        <React.Fragment>
            <WidgetSearch />
            <WidgetAboutUs />
            <WidgetCategories widgetTitle={<FormattedMessage id="HEADER_CATEGORIES" />} categories={categories} />
            <WidgetPosts widgetTitle="Latest Posts" posts={blogsData?.blogs || []} />
            <WidgetNewsletter />
            {/* <WidgetComments widgetTitle="Latest Comments" comments={comments} /> */}
            <WidgetTags widgetTitle="Tags Cloud" />
        </React.Fragment>
    );
}

export default BlogSidebar;

