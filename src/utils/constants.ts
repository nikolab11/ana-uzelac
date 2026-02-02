import { Product } from "@/types/api.types";

export const PRODUCT_SIZES = [
  "112 cm x 112 cm",
  "112 cm x 120.6 cm",
  "135 cm x 135 cm",
  "137 cm x 186.6 cm",
  "137 cm x 197.63 cm",
];

export const EUR_SYMBOL = "€";

export const SHIPPING_PRICE = 0;

// Products where only the first size can be added to cart (second size is display only)
export const FIRST_SIZE_ONLY_PRODUCT_IDS = [1, 2, 3, 7, 8, 9];

export const SORT_OPTIONS = ["relevance", "price-min", "price-max"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const SORT_OPTIONS_DATA: Record<
  SortOption,
  {
    translation: string;
    comparator: (a: Product, b: Product) => number;
  }
> = {
  relevance: {
    translation: "relevance",
    comparator: (a, b) => a.product_id - b.product_id,
  },
  "price-min": {
    translation: "lowest_price",
    comparator: (a, b) =>
      Math.min(...a.options.map((val) => val.price)) -
      Math.min(...b.options.map((val) => val.price)),
  },
  "price-max": {
    translation: "highest_price",
    comparator: (a, b) =>
      Math.max(...b.options.map((val) => val.price)) -
      Math.max(...a.options.map((val) => val.price)),
  },
};
