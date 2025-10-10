/* eslint-disable no-multiple-empty-lines */
import { NextApiRequest, NextApiResponse } from 'next';
import { shopApi } from '~/api';
import { ICategory } from '~/interfaces/category';

const SITE_URL = 'http://localhost:3000';
const generateCategoryUrls = (categories: ICategory[]) => {
    let urls: string[] = [];

    categories.forEach((category) => {
        urls.push(`${SITE_URL}/product-category/${category.slug}/products`);

        if (category.children && category.children.length > 0) {
            urls = [...urls, ...generateCategoryUrls(category.children)];
        }
    });

    return urls;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const staticPages = [
        `${SITE_URL}/`,
        `${SITE_URL}/checkout`,
        `${SITE_URL}/privacy-policy`,
        `${SITE_URL}/term-and-conditions`,
        `${SITE_URL}/refund-and-returns`,
        `${SITE_URL}/my-account`,
        `${SITE_URL}/customer-help`,
        `${SITE_URL}/shop`,
        `${SITE_URL}/international-shipping-information/`,
        `${SITE_URL}/contact-us`,
        `${SITE_URL}/wishlist`,
        `${SITE_URL}/track-order`,
        `${SITE_URL}/404`,
    ];

    const products = await shopApi.getProductsList({ page: 1, limit: 1000 }); // Fetch from database or API
    const categories = await shopApi.getCategories();
    const categoryUrls = generateCategoryUrls(categories);

    const productUrls = products.items.map((product) => `${SITE_URL}/products/${product.slug}`);
    // const categoryUrls = categories.map((category) => `${SITE_URL}/category/${category.slug}`);

    const allUrls = [...staticPages, ...productUrls, ...categoryUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
        .map(
            (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join('')}
  </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
}

