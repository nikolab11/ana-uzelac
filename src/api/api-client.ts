import * as querystring from 'querystring';

interface Options {
	params: Record<string, string | number>,
	headers: Record<string, string | number>,
}

export const ApiClient = {
	get: async <T = object>(url: string, options?: Partial<Options>): Promise<T | undefined> => {
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
			if (result.status === 404) {
				return undefined;
			}
			return await result.json();
		} catch (error) {
			throw error;
		}
	},

	post: async <T = object>(url: string, body: object, options?: Partial<Options>): Promise<{
		status: number,
		data: T
	}> => {
		url = `${process.env.API_BASE_URL}${url}`;
		if (options?.params) {
			url = `${url}?${querystring.stringify(options.params)}`;
		}
		const result = await fetch(url, {
			headers: {
				...options?.headers,
				['x-api-key']: process.env.API_KEY || ''
			},
			body: JSON.stringify(body),
			method: 'POST'
		});
		const response = await result.json();
		return {
			data: response,
			status: result.status
		};
	}
};