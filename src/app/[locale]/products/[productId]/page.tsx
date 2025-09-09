import { fetchSingleProduct } from '@/api/products';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductImages } from '@/app/[locale]/products/[productId]/ProductImages';
import { Product } from '@/types/api.types';
import { ProductInfo } from '@/app/[locale]/products/[productId]/ProductInfo';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { PageProps } from '@/types/pages.types';
import { ProductSideImages } from '@/app/[locale]/products/[productId]/ProductSideImages';

interface Params {
	productId: string;
}

export default async function ProductShowPage(props: { params: Promise<Params> }) {
	const { productId } = await props.params;
	const product = await fetchSingleProduct(Number(productId));
	if (!product) {
		return notFound();
	}
	return (
		<AppLayout mode='regular' omitFooter>
			<InnerPage product={product} />
		</AppLayout>
	);
}

interface Props {
	product: Product;
}

function InnerPage({ product, collections, images }: Props & PageProps) {
	const locale = useLocale() as LocaleType;

	return (
		<div className={'h-full overflow-y-visible relative'}>
			<div className={'w-full overflow-x-hidden h-full'}>
				<ProductImages product={product} />
				<div className={'fixed top-[144px] z-1200 md:right-[10%] ml-2 right:[20%] shadow-2xl'} style={{
					maxWidth: '400px',
					overflowX: 'hidden',
					overflowY: 'auto',
					maxHeight: '75vh'
				}}>
					<ProductInfo locale={locale} product={product} collections={collections || []} />
				</div>
			</div>
			<div
				className={'px-[var(--container-padding)] md:w-[70%]  py-6 flex flex-col gap-7 justify-center items-center'}>
				<div className={'bg-[#FCF7F1] w-full p-6 flex flex-col gap-7 justify-center items-center'}>
					<h4 className={'font-normal text-xl'}>#The inspiration</h4>
					<p className={'font-normal text-sm'} dangerouslySetInnerHTML={{
						__html: product[`inspiration_${locale}`] || ''
					}} />
				</div>
				<ProductSideImages images={product.images_down || []} />
				<div className={'bg-[#FCF7F1] p-6 flex flex-col gap-7 justify-center items-center'}>
					<h4 className={'font-normal text-xl'}>#Description</h4>
					<p className={'font-normal text-sm'} dangerouslySetInnerHTML={{
						__html: product[`description_${locale}`]
					}} />
				</div>
			</div>
			<Footer collections={collections || []} logo={images?.logo.logo_png || ''} />
		</div>
	);
}