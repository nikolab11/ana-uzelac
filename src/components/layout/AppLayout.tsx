import { Header } from '@/components/layout/header/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchImages } from '@/api/images';
import { fetchAllCollections } from '@/api/products';
import { CSSProperties, ReactNode } from 'react';
import { HeaderMode } from '@/components/layout/header/HeaderWrapper';

const containerStyle: CSSProperties = {
	msOverflowStyle: 'none',
	scrollbarWidth: 'none'
};

export async function AppLayout({
									children,
									mode
								}: Readonly<{
	children: ReactNode;
	mode?: HeaderMode;
}>) {
	const images = await fetchImages();
	const collections = await fetchAllCollections();
	return (
		<div
			className={`antialiased relative flex flex-col h-screen bg-[#F6F1EB]`}>
			<Header mode={mode || 'regular'} productsImage={images.home_page.img_1050_copy}
					collections={collections.collections}
					logo={images.logo.logo_png} />
			<div id={'app-container'} style={containerStyle} className={'flex-1 overflow-y-auto'}>
				{children}
				<Footer collections={collections.collections} logo={images.logo.logo_png} />
			</div>
		</div>
	);
}