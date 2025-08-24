export const LOCALES = ['eng', 'fr'] as const;

export type LocaleType = typeof LOCALES[number]

export const BASE_PATHS = {
	'/home': '/home',
	'/shop': '/shop',
	'/news': '/news',
	'/about': '/about',
	'/privacy-policy': '/privacy-policy',
	'/terms-conditions': '/terms-conditions',
	'/story': '/story'
} as const;

export const DYNAMIC_PATHS = {
	'/products/[productId]': '/products/[productId]',
	'/collections/[collectionId]': '/collections/[collectionId]'
} as const;

export type BasePath = keyof typeof BASE_PATHS

export type DynamicPath = keyof typeof DYNAMIC_PATHS