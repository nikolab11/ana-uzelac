import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
	experimental: {
		createMessagesDeclaration: './messages/en.json'
	}
});
const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [new URL('https://anauzelac.s3.eu-north-1.amazonaws.com/**')]
	}
};

export default withNextIntl(nextConfig);
