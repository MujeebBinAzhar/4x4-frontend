// Product utility functions
import { IProduct } from '~/interfaces/product';

/**
 * Get the correct prices for display based on the product structure
 * Handles both old structure (price, compareAtPrice) and new structure (prices, quickDiscount)
 */
export interface IProductPrices {
    currentPrice: number;
    originalPrice: number | null;
    hasDiscount: boolean;
    discountAmount?: number;
    discountPercentage?: number;
    discountType?: 'fixed' | 'percentage';
}

export function getProductPrices(product: IProduct): IProductPrices {
    // Check if product has the new price structure with quick discount
    if (product.prices && product.quickDiscount?.isActive) {
        const currentPrice = product.prices.price;
        const originalPrice = product.prices.originalPrice;
        const hasDiscount = currentPrice < originalPrice;

        return {
            currentPrice,
            originalPrice: hasDiscount ? originalPrice : null,
            hasDiscount,
            discountAmount: product.quickDiscount.dollarAmount || undefined,
            discountPercentage: product.quickDiscount.percentageAmount || undefined,
            discountType: product.quickDiscount.dollarAmount > 0 ? 'fixed' : 'percentage',
        };
    }

    // Check if product has new price structure without quick discount
    if (product.prices) {
        const currentPrice = product.prices.price;
        const originalPrice = product.prices.originalPrice;
        const hasDiscount = currentPrice < originalPrice;

        return {
            currentPrice,
            originalPrice: hasDiscount ? originalPrice : null,
            hasDiscount,
        };
    }

    // Fallback to old structure (price, compareAtPrice)
    return {
        currentPrice: product.price,
        originalPrice: product.compareAtPrice,
        hasDiscount: product.compareAtPrice !== null && product.compareAtPrice > product.price,
    };
}

/**
 * Calculate discount percentage for display
 */
export function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
    if (originalPrice <= 0) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Get discount badge text
 */
export function getDiscountBadgeText(prices: IProductPrices): string | null {
    if (!prices.hasDiscount || !prices.originalPrice) return null;

    // If we have explicit discount info, use it
    if (prices.discountType === 'fixed' && prices.discountAmount) {
        return `Save $${prices.discountAmount.toFixed(2)}`;
    }

    if (prices.discountType === 'percentage' && prices.discountPercentage) {
        return `-${prices.discountPercentage}%`;
    }

    // Calculate percentage from prices
    const percentage = calculateDiscountPercentage(prices.originalPrice, prices.currentPrice);
    return percentage > 0 ? `-${percentage}%` : null;
}

