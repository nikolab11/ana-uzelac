import { ProductItem } from '@/components/products/ProductItem';
import { Link } from '@/i18n/navigation';
import { Product } from '@/types/api.types';
import { useTranslations } from 'next-intl';
import { ChevronRight } from '@/components/icons/ChevronRight';

interface Props {
	products: Product[];
	discoverAllButton?: boolean;
}

export function ProductsSection(props: Props) {
	const t = useTranslations('home_page');
	return (
		<div>
			{props.discoverAllButton && <div className='flex justify-end'>
				<Link href={'/shop'}>
					<div
						className='border cursor-pointer gap-3 items-center flex justify-between border-[#444444] text-[#444444] rounded-lg px-[16px] py-[8px]'>
						<div> {t('discover_all_items')} </div>
						<div>
							<ChevronRight stroke={'#444444'} />
						</div>
					</div>
				</Link>
			</div>}
			<div className='pt-9 flex justify-between gap-[48px] overflow-x-auto'>
				{
					props.products.map(product => {
						return (
							<div key={product.product_id} className={'grow basis-xs '}>
								<ProductItem product={product} />
							</div>
						);
					})
				}
			</div>
		</div>
	);
}