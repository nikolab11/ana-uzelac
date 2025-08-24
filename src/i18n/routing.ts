import { defineRouting } from 'next-intl/routing';
import { BASE_PATHS, DYNAMIC_PATHS, LOCALES } from '@/types/routing';

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: 'eng',
	localeDetection: false,
	pathnames: { ...BASE_PATHS, ...DYNAMIC_PATHS }
});