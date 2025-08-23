import type { Metadata } from 'next';
import './globals.css';
import { fetchImages } from '@/api/images';
import { Header } from '@/components/layout/Header';
import { CSSProperties, ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { fetchAllCollections } from '@/api/products';
import { Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

const playfair = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-playfair'
});

export const metadata: Metadata = {
	title: 'Ana Uzelac Design ',
	description: 'Ana Uzelac art shop'
};

const containerStyle: CSSProperties = {
	msOverflowStyle: 'none',
	scrollbarWidth: 'none'
};

export default async function RootLayout({
											 children
										 }: Readonly<{
	children: ReactNode;
}>) {
	const images = await fetchImages();
	const collections = await fetchAllCollections();
	return (
		<html>
		<body className={playfair.variable}>
		<NextIntlClientProvider>
			<div
				className={`antialiased relative flex flex-col h-screen `}>
				<Header collections={collections.collections} logo={images.logo.logo_png} />
				<div id={'app-container'} style={containerStyle} className={'flex-1 overflow-y-auto'}>
					{children}
					<Footer collections={collections.collections} logo={images.logo.logo_png} />
				</div>
			</div>
		</NextIntlClientProvider>
		</body>
		</html>
	);
}
