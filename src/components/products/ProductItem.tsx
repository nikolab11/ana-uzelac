import { Product } from '@/types/api.types';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { ProductItemImages } from '@/components/products/ProductItemImages';
import { LocaleType } from '@/types/routing';

interface Props {
	product: Product;
	dark?: boolean;
}

export function ProductItem(props: Props) {
	const locale = useLocale() as LocaleType;
	const name = props.product[`name_${locale}`];
	return (
		<div className={props.dark ? 'text-white' : undefined}>
			<ProductItemImages product={props.product} />
			<div className='py-2 flex justify-between items-center'>
				<div>
					<div className={'pb-2  text-sm font-medium'}>
						{name}
					</div>
					<div className={'pb-2  text-sm font-light'}>
						{`${props.product.price}${props.product.currency}`}
					</div>
				</div>
				<div>
					<Link href={{
						pathname: '/products/[productId]',
						params: { productId: props.product.product_id }
					}}>
						<div className={`border ${props.dark ? 'border-white' : 'border-[#444444]'} p-2 rounded-full`}>
							<ShoppingBag stroke={props.dark ? 'white' : '#444444'} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}