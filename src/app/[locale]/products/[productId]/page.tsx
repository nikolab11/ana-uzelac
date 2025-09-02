import { fetchSingleProduct } from '@/api/products';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductImages } from '@/app/[locale]/products/[productId]/ProductImages';
import { Collection, Product } from '@/types/api.types';
import { ProductInfo } from '@/app/[locale]/products/[productId]/ProductInfo';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';
import { notFound } from 'next/navigation';

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
		<AppLayout mode='regular'>
			<InnerPage product={product} />
		</AppLayout>
	);
}

interface Props {
	product: Product;
	collections?: Collection[];
}

function InnerPage({ product, collections }: Props) {
	const locale = useLocale() as LocaleType;
	return (
		<div className={'w-full overflow-hidden h-full'}>
			<ProductImages product={product} />
			<div className={'fixed top-[144px] z-1200 right-[var(--container-padding)] shadow-2xl'} style={{
				maxWidth: '350px',
				overflowX: 'hidden',
				overflowY: 'auto',
				maxHeight: '75vh'
			}}>
				<ProductInfo locale={locale} product={product} collections={collections || []} />
			</div>
		</div>
	);
}