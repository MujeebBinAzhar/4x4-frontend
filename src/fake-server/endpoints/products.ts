/* eslint-disable operator-linebreak */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable indent */
// application
import { AbstractFilterBuilder } from "~/fake-server/filters/abstract-filter-builder";
import { CategoryFilterBuilder } from "~/fake-server/filters/category-filter-builder";
import { CheckFilterBuilder } from "~/fake-server/filters/check-filter-builder";
import { ColorFilterBuilder } from "~/fake-server/filters/color-filter-builder";
import { getNextReviewId, reviews } from "~/fake-server/database/reviews";
import { IProductsList, IProduct, ISeo } from "~/interfaces/product";
import { IReview } from "~/interfaces/review";
import { products as dbProducts } from "~/fake-server/database/products";
import { RadioFilterBuilder } from "~/fake-server/filters/radio-filter-builder";
import { RangeFilterBuilder } from "~/fake-server/filters/range-filter-builder";
import { RatingFilterBuilder } from "~/fake-server/filters/rating-filter-builder";
import { VehicleFilterBuilder } from "~/fake-server/filters/vehicle-filter-builder";
import {
  clone,
  delayResponse,
  error,
  makeCursorBasedNavigation,
  makePageBasedNavigation,
} from "~/fake-server/utils";
import {
  IFilterValues,
  IListOptions,
  INavigation,
  IReviewsList,
} from "~/interfaces/list";
import {
  IAddProductReviewData,
  IGetSearchSuggestionsOptions,
  IGetSearchSuggestionsResult,
} from "~/api/base";
import axiosInstance from "~/api/api-handler";

const transformReviewData = (data: any) => ({
  id: getNextReviewId(), // Assuming you have a function to get the next ID
  date: new Date().toISOString().substr(0, 10), // Format current date as 'YYYY-MM-DD'
  author: data?.name || "", // Set the reviewer's name (assuming 'name' is part of the review data)
  avatar: "/images/avatars/avatar-2.jpg", // Static avatar, or modify it based on your data
  rating: data?.rating || 0, // Rating of the review (assuming it's a number)
  content: data?.comment || "", // Review content (assuming it's a string)
});
const stockAvailability = async (stock: number) => {
  try {
    // Import the service dynamically to avoid circular dependencies
    const { default: StockManagementService } = await import(
      "~/services/stockManagementService"
    );
    const service = StockManagementService.getInstance();
    return await service.getStockAvailability(stock);
  } catch (error) {
    console.error("Error getting stock availability:", error);
    // Fallback to default logic
    if (stock === 0) {
      return "out-of-stock";
    }
    if (stock < 0) {
      return "on-backorder";
    }
    if (stock < 20) {
      return "low-stock";
    }
    if (stock > 40) {
      return "high-stock";
    }
    return "in-stock";
  }
};
const transformProductResponse = async (product: any) => {
  const averageRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce(
          (sum: number, review: any) => sum + review.rating,
          0
        ) / product.reviews.length
      : 0; // Default to 0 if no reviews

  const badges = [];

  if (product?.prices?.discount > 0) {
    badges.push("sale");
  }

  return {
    // eslint-disable-next-line no-underscore-dangle
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    metaKeywords: product?.metaKeywords || "",
    id: product?._id,
    name: product?.title?.en,
    excerpt: product?.excerpt || "", // short description without HTML tags
    description: product?.description?.en,
    slug: product?.slug,
    sku: product?.sku || "",
    partNumber: product?.productId, // Assuming productId as partNumber
    stock: {
      quantity: product?.stock,
      availability: await stockAvailability(product?.stock),
    },
    price:
      product?.prices?.discount > 0
        ? product?.prices?.discount
        : product?.prices?.price,
    compareAtPrice:
      product?.prices?.discount > 0 ? product?.prices?.price : null,
    images: product?.image,
    badges,
    rating: averageRating, // Assuming rating based on reviews length
    reviews: product?.reviews?.length,
    availability: product?.status === "show" ? "in_stock" : "out_of_stock",
    compatibility: "unknown", // Assuming no compatibility info
    brand: null, // No brand information in the provided data
    tags: typeof product?.tag === "string" ? JSON.parse(product.tag) : [], // Assuming tag is a JSON string
    type: "product", // Assuming product as a generic type
    // categories:
    //     product?.categories?.map((category: any) => ({
    //         _id: category?._id,
    //         name: category?.name?.en,
    //     })) || [],
    attributes: [], // Assuming no attributes are provided
    options: product?.variants?.map((variant: any) => ({
      variantId: variant?.productId,
      sku: variant?.sku || "",
      price: variant?.price,
      image: variant?.image,
      quantity: variant?.quantity,
    })),
    customFields: {}, // Assuming no custom fields are provided
  };
};

export async function getProductsList(
  options: IListOptions = {},
  filterValues: IFilterValues = {}
): Promise<IProductsList> {
  const filters: AbstractFilterBuilder[] = [
    new CategoryFilterBuilder("category", "Categories"),
    new VehicleFilterBuilder("vehicle", "Vehicle"),
    new RangeFilterBuilder("price", "Price"),
    new CheckFilterBuilder("brand", "Brand"),
    new RadioFilterBuilder("discount", "With Discount"),
    new RatingFilterBuilder("rating", "Rating"),
    new ColorFilterBuilder("color", "Color"),
  ];

  let products = dbProducts.slice(0);

  filters.forEach((filter) =>
    filter.makeItems(products, filterValues[filter.slug])
  );

  // Calculate items count for filter values.
  filters.forEach((filter) => filter.calc(filters));

  // Apply filters to products list.
  products = products.filter((product) =>
    filters.reduce<boolean>((mr, filter) => mr && filter.test(product), true)
  );

  const sort = options?.sort || "default";

  // Sort items array.
  products = products.sort((a, b) => {
    if (["name_asc", "name_desc"].includes(sort)) {
      if (a.name === b.name) {
        return 0;
      }

      return (a.name > b.name ? 1 : -1) * (sort === "name_asc" ? 1 : -1);
    }

    return 0;
  });

  // General
  const limit = options?.limit || 16;
  let result: [IProduct[], INavigation];

  if (filterValues.category === "interior-parts") {
    // Cursor based navigation
    result = makeCursorBasedNavigation(
      products,
      limit,
      options?.after,
      options?.before,
      (product) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        product.id.toString()
    );
  } else {
    // Page based navigation
    result = makePageBasedNavigation(products, limit, options?.page || 1);
  }

  const [, navigation] = result;

  try {
    // Make the API request
    const response = await axiosInstance.get("/products/", {
      params: {
        ...options,
        ...filterValues,
      },
    });
    if (!response.data) {
      return error("Page Not Found");
    }
    // eslint-disable-next-line max-len
    return {
      items: (await Promise.all(
        response?.data?.data?.map((ite: any) => transformProductResponse(ite))
      )) as unknown as any,
      sort,
      navigation: {
        ...navigation,
        type: "page",
        limit: response?.data?.pagination?.limit,
        total: response?.data?.pagination?.total,
        page: response?.data?.pagination?.page,
        pages: response?.data?.pagination?.totalPages,
        from:
          response?.data?.pagination?.page === 1
            ? 1
            : (response?.data?.pagination?.page - 1) *
                response?.data?.pagination?.limit +
              1,
        to:
          response?.data?.pagination?.page * response?.data?.pagination?.limit,
      },
      filters: filters.map((x) => x.build()),
    };

    //  return ; // Return the product data from the response
  } catch (error) {
    // console.error('Error fetching featured products:', error);
    throw new Error("Failed to fetch featured products.");
  }
}

export async function getSeoByPage(slug: string): Promise<ISeo> {
  try {
    const response = await axiosInstance.get(`/seo/${slug}`);
    if (!response.data.data) {
      return {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: [],
      };
    }
    return {
      metaTitle: response.data?.data?.metaTitle || "",
      metaDescription: response.data?.data?.metaDescription || "",
      metaKeywords: response.data?.data?.metaKeywords || [],
    } as ISeo;
  } catch (error) {
    return {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
    };
  }
}
export async function getProductBySlug(slug: string): Promise<IProduct> {
  try {
    // Make the API request
    const response = await axiosInstance.get(`/products/${slug}`);
    if (!response.data) {
      return error("Page Not Found");
    }
    // eslint-disable-next-line max-len
    return (await transformProductResponse(
      response.data
    )) as unknown as IProduct; // Return the product data from the response
  } catch (error) {
    throw new Error("Failed to fetch featured products.");
  }
}
export async function getProductById(id: string): Promise<IProduct> {
  try {
    // Make the API request
    const response = await axiosInstance.get(`/products/get-by-id/${id}`);
    if (!response.data) {
      return error("Product Not Found");
    }
    // eslint-disable-next-line max-len

    return (await transformProductResponse(
      response.data
    )) as unknown as IProduct; // Return the product data from the response
  } catch (error) {
    throw new Error("Failed to fetch featured products.");
  }
}

export async function getProductReviews(
  productId: number,
  options?: IListOptions
): Promise<IReviewsList> {
  try {
    // Make the API request
    const response = await axiosInstance.get(`/reviews/product/${productId}`);
    if (!response.data) {
      return error("Product Not Found");
    }
    // eslint-disable-next-line max-len
    const limit = options?.limit || 8;
    const sort = options?.sort || "default";
    const transformData = response.data.map((item: any) =>
      transformReviewData(item)
    );
    const [chunk, navigation] = makePageBasedNavigation(
      transformData,
      limit,
      options?.page || 1
    );

    return Promise.resolve({
      items: chunk as IReview[],
      sort,
      navigation,
    });
  } catch (error) {
    throw new Error("Failed to fetch products reviews.");
  }
}

export function addProductReview(
  productId: number,
  data: IAddProductReviewData
): Promise<IReview> {
  const review: IReview = {
    id: getNextReviewId(),
    date: new Date().toISOString().substr(0, 10),
    author: data.author,
    avatar: "/images/avatars/avatar-2.jpg",
    rating: data.rating,
    content: data.content,
  };

  reviews.push(review);

  return delayResponse(Promise.resolve(review));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getProductAnalogs(productId: number): Promise<IProduct[]> {
  const slugs: string[] = [
    "sunset-brake-kit",
    "specter-brake-kit",
    "brake-kit",
  ];
  const analogs: IProduct[] = dbProducts.filter((x) => slugs.includes(x.slug));

  return Promise.resolve(clone(analogs));
}

export function getRelatedProducts(
  productId: number,
  limit: number
): Promise<IProduct[]> {
  return Promise.resolve(clone(dbProducts.slice(0, limit)));
}

export async function getFeaturedProducts(
  categorySlug: string | null,
  limit: number
): Promise<IProduct[]> {
  try {
    const params: Record<string, string | number> = { limit }; // Add limit as a query parameter
    if (categorySlug) {
      params.categorySlug = categorySlug; // Include categorySlug if available
    }

    // Make the API request
    const response = await axiosInstance.get<IProduct[]>("/products/featured", {
      params,
    });
    // eslint-disable-next-line max-len
    console.log(response);
    return (await Promise.all(
      response.data.map((item) => transformProductResponse(item))
    )) as unknown as IProduct[]; // Return the product data from the response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw new Error("Failed to fetch featured products.");
  }
}

export async function getPopularProducts(
  categorySlug: string | null,
  limit: number
): Promise<IProduct[]> {
  try {
    const params: Record<string, string | number> = { limit }; // Add limit as a query parameter
    if (categorySlug) {
      params.categorySlug = categorySlug; // Include categorySlug if available
    }

    // Make the API request
    const response = await axiosInstance.get<IProduct[]>(
      "/products/best-seller",
      { params }
    );
    // eslint-disable-next-line max-len
    return (await Promise.all(
      response.data.map((item) => transformProductResponse(item))
    )) as unknown as IProduct[]; // Return the product data from the response
  } catch (error) {
    console.error("Error fetching best-seller products:", error);
    throw new Error("Failed to fetch best-seller products.");
  }
}

export async function getTopRatedProducts(
  categorySlug: string | null,
  limit: number
): Promise<IProduct[]> {
  try {
    const params: Record<string, string | number> = { limit }; // Add limit as a query parameter
    if (categorySlug) {
      params.categorySlug = categorySlug; // Include categorySlug if available
    }

    // Make the API request
    const response = await axiosInstance.get<IProduct[]>(
      "/products/top-rated",
      { params }
    );
    // eslint-disable-next-line max-len
    return (await Promise.all(
      response.data.map((item) => transformProductResponse(item))
    )) as unknown as IProduct[]; // Return the product data from the response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw new Error("Failed to fetch featured products.");
  }
}

export async function getSpecialOffers(limit: number): Promise<IProduct[]> {
  try {
    const params: Record<string, string | number> = { limit }; // Add limit as a query parameter
    // Make the API request
    const response = await axiosInstance.get<IProduct[]>(
      "/products/special-offer",
      { params }
    );
    // eslint-disable-next-line max-len
    return (await Promise.all(
      response.data.map((item) => transformProductResponse(item))
    )) as unknown as IProduct[]; // Return the product data from the response
  } catch (error) {
    throw new Error("Failed to fetch special offer products.");
  }
}

export async function getLatestProducts(limit: number): Promise<IProduct[]> {
  try {
    const params: Record<string, string | number> = { limit }; // Add limit as a query parameter
    // Make the API request
    const response = await axiosInstance.get<IProduct[]>(
      "/products/new-arrival",
      { params }
    );
    // eslint-disable-next-line max-len
    return (await Promise.all(
      response.data.map((item) => transformProductResponse(item))
    )) as unknown as IProduct[]; // Return the product data from the response
  } catch (error) {
    console.error("Error fetching new arrival products:", error);
    throw new Error("Failed to fetch new arrival products.");
  }
}

export async function getSearchSuggestions(
  query: string,
  options?: IGetSearchSuggestionsOptions
): Promise<IGetSearchSuggestionsResult> {
  const queryVal = query.toLowerCase();
  const optionsVal = {
    limitProducts: 4,
    limitCategories: 4,
    ...options,
  };

  try {
    // Make the API request
    const response = await axiosInstance.get<IProduct[]>("/products/search", {
      params: {
        ...optionsVal,
        query: queryVal,
      },
    });
    // eslint-disable-next-line max-len

    return Promise.resolve({
      products: (await Promise.all(
        response.data.map((item) => transformProductResponse(item))
      )) as unknown as IProduct[],
      categories: [],
    });
  } catch (error) {
    throw new Error("Failed to fetch new search products.");
  }
}
