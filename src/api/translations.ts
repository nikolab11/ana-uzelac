import { ApiClient } from '@/api/api-client';
import { Translations } from '@/types/api.types';

export async function getTranslations() {
	return ApiClient.get<Translations>('/au_translations_formatted');
}