import { Collection, ImagesResponse } from '@/types/api.types';

export interface PageProps {
	images?: ImagesResponse;
	collections?: Collection[];
}
