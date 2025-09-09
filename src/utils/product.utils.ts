import { GeAllProductsResponse, Product, ProductFilter } from '@/types/api.types';
import { SORT_OPTIONS_DATA } from '@/utils/constants';

export function filterProducts(products: Product[], params: Partial<ProductFilter>): Product[] {

	const filtered = products.filter(product => {
		if (params.price_min && product.options.every(opt => opt.price < (params.price_min || 0))) {
			return false;
		}
		if (params.price_max && product.options.every(opt => opt.price > (params.price_max || 0))) {
			return false;
		}
		if (params.collection_ids && (product.collection_id === undefined || !params.collection_ids.includes(product.collection_id))) {
			return false;
		}
		if (params.search && !product.name_fr.includes(params.search) && product.name_eng.includes(params.search)) {
			return false;
		}
		return !(params.sizes && !params.sizes.some(size => product.options.map(o => o.size).includes(size)));

	});
	return params.sortOption ? filtered.sort(SORT_OPTIONS_DATA[params.sortOption].comparator) : filtered;
}

export function calculatePrices(productResponse: GeAllProductsResponse): { min: number, max: number } {
	const products = [...productResponse.products.original_products, ...productResponse.products.collection_products];

	return products.reduce((acc, val) => {
		const prices = val.options.map(o => o.price);
		acc.min = Math.min(acc.min, ...prices);
		acc.max = Math.max(acc.max, ...prices);
		return acc;
	}, { min: products[0]?.options[0]?.price || 0, max: products[0]?.options[0]?.price || 0 });
}

export function formatNumber(val: number, minDigits: number = 2) {
	return val.toLocaleString('sr-Latn', {
		maximumFractionDigits: 2,
		minimumFractionDigits: minDigits
	});
}

export function getMinProductPrice(product: Product) {
	return Math.min(...product.options.map(o => o.price));
}