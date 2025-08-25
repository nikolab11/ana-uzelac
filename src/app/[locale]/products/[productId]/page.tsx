import { fetchSingleProduct } from '@/api/products';
import { getLocale } from 'next-intl/server';
import { LocaleType } from '@/types/routing';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductImages } from '@/app/[locale]/products/[productId]/ProductImages';

interface Params {
	productId: string;
}

export default async function ProductShowPage(props: { params: Promise<Params> }) {
	const [{ productId }, locale] = await Promise.all([props.params, getLocale() as Promise<LocaleType>]);
	const product = await fetchSingleProduct(Number(productId));

	return (
		<AppLayout mode='regular'>
			<div>
				<ProductImages product={product} />
			</div>
		</AppLayout>
	);
}