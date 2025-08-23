import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['eng', 'fr'],
	defaultLocale: 'eng',
	pathnames: {
		'/': '/',
		'/pathnames': {
			fr: '/pfadnamen'
		}
	}
});