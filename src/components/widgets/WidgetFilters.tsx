/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
// react
import React, { useEffect, useState } from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// application
import { useShopFilters, useShopFilterValues, useShopResetFiltersThunk } from '~/store/shop/shopHooks';
import { IShopPageOffCanvasSidebar } from '~/interfaces/pages';
import Filter from '~/components/filters/Filter';
import { useDeferredData } from '~/services/hooks';
import { shopApi } from '~/api';
import { IFilter } from '~/interfaces/filter';

interface Props {
    offcanvasSidebar: IShopPageOffCanvasSidebar;
}

function WidgetFilters(props: Props) {
    const { offcanvasSidebar } = props;
    const tempFilters = useShopFilters();
    const [filters, setFilters] = useState(tempFilters);
    const values = useShopFilterValues();
    const shopResetFilters = useShopResetFiltersThunk();

    const rootClasses = classNames('widget', 'widget-filters', `widget-filters--offcanvas--${offcanvasSidebar}`);
    const brands = useDeferredData(() => shopApi.getBrands({ limit: 16 }), []);
    const categories = useDeferredData(() => shopApi.getCategories(), []);

    useEffect(() => {
        setFilters(
            (prev) =>
                prev.map((item) => {
                    if (item.name === 'Brand') {
                        return {
                            ...item,
                            items: brands.data?.map((item) => ({
                                slug: item.slug,
                                name: item.name,
                                count: item.productCount || 0,
                            })),
                        };
                    }
                    return item;
                }) as IFilter[],
        );
        setFilters(
            (prev) =>
                prev.map((item) => {
                    if (item.name === 'Categories') {
                        return {
                            ...item,
                            items: categories.data,
                        };
                    }
                    return item;
                }) as IFilter[],
        );
    }, [brands, categories]);
    return (
        <div className={rootClasses}>
            <div className="widget__header widget-filters__header">
                <h4>
                    <FormattedMessage id="HEADER_FILTERS" />
                </h4>
            </div>
            <div className="widget-filters__list">
                {filters
                    .filter((item) => item.type !== 'vehicle')
                    .map((filter) => (
                        <Filter key={filter.slug} filter={filter} value={values[filter.slug]} />
                    ))}
            </div>

            <div className="widget-filters__actions d-flex">
                <button type="button" className="btn btn-secondary btn-sm" onClick={shopResetFilters}>
                    <FormattedMessage id="BUTTON_RESET" />
                </button>
            </div>
        </div>
    );
}

export default React.memo(WidgetFilters);

