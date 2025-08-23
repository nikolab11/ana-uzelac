export interface ImagesResponse {
	about_page: Record<string, string>,
	home_page: Record<string, string>,
	logo: {
		logo_png: string
	}
}

export interface Translations {
	eng: Record<string, string>,
	fr: Record<string, string>,
}

export interface CollectionResponse {
	collections: Collection[];
}

export interface Collection {
	collection_id: number;
	name_eng: string;
	name_fr: string;
	images: string[],
	description: string;
	products: Product[];
}

export interface Product {
	product_id: number;
	name_eng: string;
	name_fr: string;
	price: number;
	currency: string;
	description: string;
	sizes: string[],
	images: string[]
}

export interface GeAllProductsResponse {
	products: {
		collection_products: Product[],
		original_products: Product[]
	};
}