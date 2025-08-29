import Image from 'next/image';
import { ProductsSection } from '@/app/[locale]/home/ProductsSection';
import { fetchAllProducts } from '@/api/products';
import { CollectionsSection } from '@/app/[locale]/home/CollectionsSection';
import { FooterImage } from '@/components/layout/FooterImage';
import { useTranslations } from 'next-intl';
import { HoveringButton } from '@/components/common/HoveringButton';
import { GrandOpeningSection } from '@/app/[locale]/home/GrandOpeningSection';
import { AppLayout } from '@/components/layout/AppLayout';
import { Link } from '@/i18n/navigation';
import { PageProps } from '@/types/pages.types';

export default async function Home() {
	return (
		<AppLayout mode='hover'>
			<InnerPage />
		</AppLayout>
	);
}

async function InnerPage({ images, collections }: PageProps) {
	const products = await fetchAllProducts();
	if (!images || !collections) {
		throw new Error('Missing images and collections');
	}
	return (
		<>
			<div className='min-h-screen relative'>
				<Image objectFit='cover' src={images.home_page.header_hp} alt={'Image'} fill />
				<HeadText />
			</div>
			<GrandOpeningSection
				images={[images.home_page.grand_opening_1, images.home_page.grand_opening_2, images.home_page.grand_opening_3]} />
			<div className={'px-[var(--container-padding)] py-6'}>
				<ProductsSection discoverAllButton products={products.products.original_products.slice(0, 3)} />
			</div>
			<CollectionsSection collections={collections} />
			<FooterImage img={images.home_page.wearing_the_moment} />
		</>
	);
}

function HeadText() {
	const t = useTranslations('home_page');
	return (
		<div className={'absolute w-full h-full flex justify-between pl-[10%] pr-[10%] flex-wrap gap-5 items-center'}>
			<div className={'basis-xs'}>
				<h3 className={'text-7xl text-bold text-white pb-3'}>{t('new_scarf_collections')}</h3>
				<p className={'text-white text-end font-normal text-2xl'}>{t('winter_2026')}</p>
			</div>
			<div>
				<Link href={'/shop'}>
					<HoveringButton label={t('shop_now')} />
				</Link>
			</div>
		</div>
	);
}