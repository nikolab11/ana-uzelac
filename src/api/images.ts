import { ApiClient } from '@/api/api-client';
import { ImagesResponse } from '@/types/api.types';

export async function fetchImages(): Promise<ImagesResponse> {
	return ApiClient.get<ImagesResponse>('/au_load_other_images');
}