import { GeAllProductsResponse, Product, ProductFilter } from '@/types/api.types';

export function filterProducts(products: Product[], params: Partial<ProductFilter>): Product[] {

	return products.filter(product => {
		if (params.price_min && product.price < params.price_min) {
			return false;
		}
		if (params.price_max && product.price > params.price_max) {
			return false;
		}
		if (params.collection_ids && (product.collection_id === undefined || !params.collection_ids.includes(product.collection_id))) {
			return false;
		}
		return !(params.sizes && !params.sizes.some(size => product.sizes.includes(size)));

	});
}

export function calculatePrices(productResponse: GeAllProductsResponse): { min: number, max: number } {
	const products = [...productResponse.products.original_products, ...productResponse.products.collection_products];

	return products.reduce((acc, val) => {
		acc.min = Math.min(acc.min, val.price);
		acc.max = Math.max(acc.max, val.price);
		return acc;
	}, { min: products[0]?.price || 0, max: products[0]?.price || 0 });
}