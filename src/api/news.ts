import { ApiClient } from '@/api/api-client';
import { BaseNews, News } from '@/types/api.types';

export async function fetchNews() {
	return await ApiClient.get<{ news: BaseNews[] }>('/au_news');
}

export async function fetchNewsById(id: string) {
	return await ApiClient.get<News>(`/au_single_news/${id}/`);
}