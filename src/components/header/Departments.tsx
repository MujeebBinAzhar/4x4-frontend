/* eslint-disable object-curly-newline */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
// react
import React, { useCallback, useEffect, useRef, useState } from 'react';
// third-party
import classNames from 'classnames';
// application
import slugify from 'react-slugify';
import AppLink from '~/components/shared/AppLink';
import Megamenu from '~/components/header/Megamenu';
import { ArrowRoundedDown9x6Svg, ArrowRoundedRight7x11Svg, Menu16x12Svg } from '~/svg';
import { IDepartmentsLink } from '~/interfaces/departments-link';
import { useDeferredData, useGlobalMousedown } from '~/services/hooks';
// data
import dataHeaderDepartments from '~/data/headerDepartments';
import { shopApi } from '~/api';
import { IShopCategory } from '~/interfaces/category';
import { IMegamenuColumn } from '~/interfaces/menu';
import { INestedLink } from '~/interfaces/link';

interface Props {
    label: React.ReactNode;
}

function Departments(props: Props) {
    const { label } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [megaMenu, setMegaMenu] = useState(dataHeaderDepartments);
    const [currentItem, setCurrentItem] = useState<IDepartmentsLink | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        setIsOpen((state) => !state);
    };

    const handleBodyMouseLeave = () => {
        setCurrentItem(null);
    };

    const handleListPaddingMouseEnter = () => {
        setCurrentItem(null);
    };

    const handleItemMouseEnter = (item: IDepartmentsLink) => {
        setCurrentItem(item);
    };

    const handleItemClick = useCallback(() => {
        setIsOpen(false);
        setCurrentItem(null);
    }, [setIsOpen, setCurrentItem]);

    useGlobalMousedown(
        (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target as HTMLElement)) {
                setIsOpen(false);
            }
        },
        [setIsOpen, rootRef],
    );

    const classes = classNames('departments', {
        'departments--open': isOpen,
    });

    function convertCategoriesToHeaderDepartments(categories: IShopCategory[]): IDepartmentsLink[] {
        function formatLink(data: IShopCategory[]) {
            return data?.map((bc: IShopCategory) => {
                const mainLink: INestedLink = {
                    title: bc.name,
                    url: `/product-category/${slugify(bc.name)}/products`,
                };
                if (bc.children) {
                    mainLink.links = formatLink(bc?.children);
                }
                return mainLink;
            });
        }
        function ConvertSubMenuColumns(data: IShopCategory[]): IMegamenuColumn[] {
            return data.map((item: IShopCategory) => ({
                size: '1of5',
                links: item?.children && item?.children?.length > 0 ? formatLink(item?.children) : formatLink([item]),
            }));
        }
        return categories.map((category: IShopCategory, index: number) => {
            const department: IDepartmentsLink = {
                title: category.name,
                url: `/product-category/${slugify(category.name)}/products`,
            };

            if (category.children) {
                department.submenu = {
                    type: 'megamenu',
                    size: category.children.length === 1 ? 'sm' : 'xl',
                    image:
                        // eslint-disable-next-line no-nested-ternary
                        index === 0
                            ? '/images/departments/departments-3.jpg'
                            : index === 2
                            ? '/images/departments/departments-2.jpg'
                            : '',
                    columns: ConvertSubMenuColumns(category.children),
                };
            }
            return department;
        });
    }

    const categories = useDeferredData(() => shopApi.getCategories(), []);
    useEffect(() => {
        if (!categories.isLoading) {
            const catData = convertCategoriesToHeaderDepartments(categories.data);
            setMegaMenu(catData);
        }
    }, [categories.isLoading]);

    return (
        <div className={classes} ref={rootRef}>
            <button className="departments__button" type="button" onClick={handleButtonClick}>
                <span className="departments__button-icon">
                    <Menu16x12Svg />
                </span>
                <span className="departments__button-title">{label}</span>
                <span className="departments__button-arrow">
                    <ArrowRoundedDown9x6Svg />
                </span>
            </button>
            <div className="departments__menu">
                <div className="departments__arrow" />
                <div className="departments__body" onMouseLeave={handleBodyMouseLeave}>
                    <ul className="departments__list">
                        <li
                            className="departments__list-padding"
                            role="presentation"
                            onMouseEnter={handleListPaddingMouseEnter}
                        />
                        {megaMenu.map((item, index) => {
                            const itemHasSubmenu = !!item.submenu;
                            const itemClasses = classNames('departments__item', {
                                'departments__item--has-submenu': itemHasSubmenu,
                                'departments__item--submenu--megamenu': item.submenu?.type === 'megamenu',
                                'departments__item--hover': item === currentItem,
                            });

                            return (
                                <li className={itemClasses} key={index} onMouseEnter={() => handleItemMouseEnter(item)}>
                                    <AppLink
                                        className="departments__item-link"
                                        href={item.url}
                                        onClick={() => handleItemClick()}
                                        {...item.customFields?.anchorProps}
                                    >
                                        {item.title}
                                        {itemHasSubmenu && (
                                            <span className="departments__item-arrow">
                                                <ArrowRoundedRight7x11Svg />
                                            </span>
                                        )}
                                    </AppLink>
                                </li>
                            );
                        })}
                        <li
                            className="departments__list-padding"
                            role="presentation"
                            onMouseEnter={handleListPaddingMouseEnter}
                        />
                    </ul>

                    <div className="departments__menu-container">
                        {megaMenu.map((item, index) => {
                            if (!item.submenu) {
                                return null;
                            }

                            const itemClasses = classNames(
                                'departments__megamenu',
                                `departments__megamenu--size--${item.submenu.size}`,
                                {
                                    'departments__megamenu--open': item === currentItem,
                                },
                            );

                            return (
                                <Megamenu
                                    className={itemClasses}
                                    menu={item.submenu}
                                    key={index}
                                    onItemClick={handleItemClick}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Departments);

