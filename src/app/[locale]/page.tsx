import Image from 'next/image';
import { fetchImages } from '@/api/images';
import { ProductsSection } from '@/app/[locale]/ProductsSection';
import { fetchAllCollections, fetchAllProducts } from '@/api/products';
import { CollectionsSection } from '@/app/[locale]/CollectionsSection';
import { FooterImage } from '@/components/layout/FooterImage';
import { useTranslations } from 'next-intl';
import { HoveringLink } from '@/components/common/HoveringLink';
import { GrandOpeningSection } from '@/app/[locale]/GrandOpeningSection';

export default async function Home() {
	const images = await fetchImages();
	const products = await fetchAllProducts();
	const collections = await fetchAllCollections();
	return (
		<div className={'bg-[#F6F1EB]'}>
			<div className='min-h-screen relative'>
				<Image objectFit='cover' src={images.home_page.img_0089} alt={'Image'} fill />
				<HeadText />
			</div>
			<GrandOpeningSection />
			<ProductsSection discoverAllButton products={products.products.original_products.slice(0, 3)} />
			<CollectionsSection collections={collections.collections} />
			<FooterImage img={images.home_page['ksenija_falling_rabbit_ruins_back']} />
		</div>
	);
}

function HeadText() {
	const t = useTranslations();
	return (
		<div className={'absolute w-full h-full flex justify-between pl-[10%] pr-[10%] flex-wrap gap-5 items-center'}>
			<div className={'basis-xs'}>
				<h3 className={'text-7xl text-bold text-white pb-3'}>{t('new_scarf_collections')}</h3>
				<p className={'text-white text-end font-normal text-2xl'}>{t('winter_2026')}</p>
			</div>
			<div>
				<HoveringLink href={'shop'} label={t('shop_now')} />
			</div>
		</div>
	);
}