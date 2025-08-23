import { Product } from '@/types/api.types';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { ProductImages } from '@/components/products/ProductImages';

interface Props {
	product: Product;
}

export function ProductItem(props: Props) {
	const locale = useLocale() as 'eng' | 'fr';
	const name = props.product[`name_${locale}`];
	console.log(name);
	return (
		<div>
			<ProductImages product={props.product} />
			<div className='py-2 flex justify-between items-center'>
				<div>
					<div className={'pb-2 text-[#444444] text-sm font-medium'}>
						{name}
					</div>
					<div className={'pb-2 text-[#444444] text-sm font-light'}>
						{`${props.product.price}${props.product.currency}`}
					</div>
				</div>
				<div>
					<Link href={`products/${props.product.product_id}`}>
						<div className='border border-[#444444] p-2 rounded-full'>
							<ShoppingBag stroke={'#444444'} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}