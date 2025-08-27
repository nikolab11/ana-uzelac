import { Product } from '@/types/api.types';

export const PRODUCT_SIZES: { value: string, label: string }[] = [
	{
		value: '112x112 cm',
		label: '112 cm x 112 cm'
	},
	{
		value: '112x120.6 cm',
		label: '112 cm x 120.6 cm'
	},
	{
		value: '135x135 cm',
		label: '135 cm x 135 cm'
	},
	{
		value: '137x186.6 cm',
		label: '137 cm x 186.6 cm'
	},
	{
		value: '137x197.63 cm',
		label: '137 cm x 197.63 cm'
	}
];

export const EUR_SYMBOL = '€';

export const SORT_OPTIONS = ['relevance', 'price-min', 'price-max'] as const;

export type SortOption = typeof SORT_OPTIONS[number];

export const SORT_OPTIONS_DATA: Record<SortOption, {
	translation: string,
	comparator: (a: Product, b: Product) => number
}> = {
	relevance: {
		translation: '#Relevance',
		comparator: (a, b) => a.product_id - b.product_id
	},
	'price-min': {
		translation: '#Price-min',
		comparator: (a, b) => a.price - b.price
	},
	'price-max': {
		translation: '#Price-max',
		comparator: (a, b) => b.price - a.price
	}

};