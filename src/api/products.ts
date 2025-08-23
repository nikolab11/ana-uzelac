import { ApiClient } from '@/api/api-client';
import { CollectionResponse, GeAllProductsResponse, Product } from '@/types/api.types';

export async function fetchAllProducts() {

	return await ApiClient.get<GeAllProductsResponse>('/au_all_products');

}

export async function fetchAllCollections() {

	return await ApiClient.get<CollectionResponse>('/au_collections_and_products');

}

export async function fetchFilteredProducts(filter: Record<string, string>) {
	return await ApiClient.get<{ products: Product[] }>('/au_filtered_products', { params: filter });
}

export async function fetchSingleProduct(productId: number) {

	return await ApiClient.get<Product>('/au_get_single_product', { params: { product_id: productId } });

}