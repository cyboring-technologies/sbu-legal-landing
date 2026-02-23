export const BASE_PRICE_CENTS = 500; // $5.00
export const PRICE_PER_PAGE_CENTS = 10; // $0.10

export interface PricingMetadata {
  pageCount: number;
  fileSize: number;
  fileType: string;
}

/**
 * Calculates the price in cents based on structural metadata.
 * Mirrors backend logic.
 */
export function calculatePrice(metadata: PricingMetadata): number {
  const pages = Math.max(0, Math.floor(metadata.pageCount) || 0);
  // Base price + linear page cost
  let price = BASE_PRICE_CENTS + pages * PRICE_PER_PAGE_CENTS;
  return price;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
