import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { CartContextProvider } from '@/context/cart/cart.context-provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const playfair = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-playfair'
});

export const metadata: Metadata = {
	title: 'Ana Uzelac Design ',
	description: 'Ana Uzelac art shop'
};

export default async function RootLayout({
											 children
										 }: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html>
		<body className={playfair.variable}>
		<NextIntlClientProvider>
			<AppRouterCacheProvider>
				<CartContextProvider>
					{children}
				</CartContextProvider>
			</AppRouterCacheProvider>
		</NextIntlClientProvider>
		</body>
		</html>
	);
}
