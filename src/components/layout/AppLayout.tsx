import { Header } from '@/components/layout/header/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchImages } from '@/api/images';
import { fetchAllCollections } from '@/api/products';
import { cloneElement, CSSProperties, ReactElement } from 'react';
import { HeaderMode } from '@/components/layout/header/HeaderWrapper';
import { PageProps } from '@/types/pages.types';

const containerStyle: CSSProperties = {
	msOverflowStyle: 'none',
	scrollbarWidth: 'none'
};

export async function AppLayout({
									children,
									mode,
									headerContent
								}: Readonly<{
	children: ReactElement<PageProps>;
	mode?: HeaderMode;
	headerContent?: ReactElement<PageProps>;
}>) {
	const [images, collections] = await Promise.all([fetchImages(), fetchAllCollections()]);
	return (
		<div
			className={`antialiased relative flex flex-col h-screen bg-[#F6F1EB]`}>
			<Header mode={mode || 'regular'} productsImage={images.home_page.rooftops_in_paris}
					collections={collections.collections}
					additionalContent={headerContent && cloneElement(headerContent, {
						images,
						collections: collections.collections
					})}
					logo={images.logo.logo_png} />
			<div id={'app-container'} style={containerStyle} className={'flex-1 overflow-y-auto relative'}>
				{cloneElement(children, { images, collections: collections.collections })}
				<Footer collections={collections.collections} logo={images.logo.logo_png} />
			</div>
		</div>
	);
}