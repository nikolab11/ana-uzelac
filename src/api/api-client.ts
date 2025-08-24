import * as querystring from 'querystring';

interface Options {
	params: Record<string, string | number>,
	headers: Record<string, string | number>,
}

export const ApiClient = {
	get: async <T = object>(url: string, options?: Partial<Options>): Promise<T> => {
		url = `${process.env.API_BASE_URL}${url}`;
		if (options?.params) {
			url = `${url}?${querystring.stringify(options.params)}`;
		}
		try {
			const result = await fetch(url, {
				headers: {
					...options?.headers,
					['x-api-key']: process.env.API_KEY || ''
				},
				method: 'GET'

			});
			return await result.json();
		} catch (error) {
			throw error;
		}
	}
};