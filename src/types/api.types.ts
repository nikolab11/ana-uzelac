import { SORT_OPTIONS, SortOption } from '@/utils/constants';

export interface ImagesResponse {
	about_page: {
		about_page_1: string;
		about_page_2: string;
		about_page_3: string;
		about_page_4: string;
		about_page_5: string;
		about_page_6: string;
		about_page_7: string;
		about_page_8: string;
		a_different_kind_of_luxury: string;
		ana: string;
		header_about: string;
		why_it_matters: string;
	},
	home_page: {
		elephants: string;
		falling_rabbit: string;
		falling_rabbit_2: string;
		garden_day_and_night: string;
		grand_opening_1: string;
		grand_opening_2: string;
		grand_opening_3: string;
		header_hp: string;
		lioness_2: string;
		lioness: string;
		moon_rabbits: string;
		night_sky_2: string;
		night_sky: string;
		prva_slika: string;
		rooftops_in_paris: string;
		sky_mountains: string;
		the_magical_south: string;
		the_moon_rabbit_collection: string;
		tropical_grasslands: string;
		wearing_the_moment: string;
		wushu_nanquan: string;

	},
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
	collection_id?: number;
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

export interface BaseNews {
	id: number;
	title_eng: string;
	title_fr: string;
	subtitle_eng: string;
	subtitle_fr: string;
	thumbnail: string;
	date: string;
}

export interface News extends BaseNews {
	content_eng: string;
	content_fr: string;
}

export interface ProductFilter {
	price_min: number;
	price_max: number;
	sizes: string[];
	collection_ids: number[];
	sortOption: SortOption;
}

export interface ProductFilterRaw {
	price_min: string;
	price_max: string;
	sizes: string[] | string;
	collection_ids: string[] | string;
	sortOption: string;
}

export function parseFilters(rawFilters: Partial<ProductFilterRaw>): Partial<ProductFilter> {
	const result: Partial<ProductFilter> = {};

	if (rawFilters.price_min) {
		result.price_min = Number(rawFilters.price_min);
	}

	if (rawFilters.price_max) {
		result.price_max = Number(rawFilters.price_max);
	}
	if (rawFilters.sizes) {
		result.sizes = Array.isArray(rawFilters.sizes) ? [...new Set(rawFilters.sizes)] : [rawFilters.sizes];
	}
	if (rawFilters.collection_ids) {
		result.collection_ids = Array.isArray(rawFilters.collection_ids) ?
			[...new Set(rawFilters.collection_ids.map(val => Number(val)))]
			: [Number(rawFilters.collection_ids)];
	}
	console.log(rawFilters.sortOption);
	if (rawFilters.sortOption && SORT_OPTIONS.includes(rawFilters.sortOption as SortOption)) {
		result.sortOption = rawFilters.sortOption as SortOption;
	}

	return result;
}