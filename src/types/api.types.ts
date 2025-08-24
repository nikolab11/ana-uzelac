export interface ImagesResponse {
	about_page: Record<string, string>,
	home_page: Record<string, string>,
	logo: {
		logo_png: string
	}
}

export interface TranslationItem {
	header: Record<string, string>;
	home_page: Record<string, string>;
	wearing_the_moment_section: Record<string, string>;
	shop_page: Record<string, string>;
	filter_and_sort: Record<string, string>;
	footer: Record<string, string>;
	about_page: Record<string, string>;
	journal_page: Record<string, string>;
	privacy_policy_page: Record<string, string>;
	terms_conditions_page: Record<string, string>;
}

export interface Translations {
	eng: TranslationItem,
	fr: TranslationItem,
}

export interface CollectionResponse {
	collections: Collection[];
}

export interface Collection {
	collection_id: number;
	name_eng: string;
	name_fr: string;
	images: Record<string, string>,
	description: string;
	products: Product[];
}

export interface Product {
	product_id: number;
	name_eng: string;
	name_fr: string;
	price: number;
	currency: string;
	description_eng: string;
	description_fr: string;
	sizes: string[],
	images: string[]
}

export interface GeAllProductsResponse {
	products: {
		collection_products: Product[],
		original_products: Product[]
	};
}