import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

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
		<body>
		{children}
		</body>
		</html>
	);
}
