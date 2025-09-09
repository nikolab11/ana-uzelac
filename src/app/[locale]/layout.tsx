import '../globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { CartContextProvider } from '@/context/cart/cart.context-provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material';
import theme from '@/utils/theme';

export default async function RootLayout({
											 children

										 }: Readonly<{
	children: ReactNode;

}>) {
	return (
		<NextIntlClientProvider>
			<AppRouterCacheProvider>
				<ThemeProvider theme={theme}>
					<CartContextProvider>
						{children}
					</CartContextProvider>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</NextIntlClientProvider>
	);
}
