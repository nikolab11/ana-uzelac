import { fetchAllProducts } from '@/api/products';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductItem } from '@/components/products/ProductItem';
import { LoadMoreProductsWrapper } from '@/app/[locale]/shop/LoadMoreProductsWrapper';
import { getTranslations } from 'next-intl/server';

export default async function ShopPage() {

	const [products, t] = await Promise.all([fetchAllProducts(), getTranslations()]);
	return (
		<div>
			<AppLayout>
				<div>
					<div className={'px-[var(--container-padding)] py-6'}>
						<div className='flex flex-col md:flex-row flex-wrap justify-between gap-8'>
							{
								products.products.collection_products.map(product => {
									return (
										<div key={product.product_id} className={'pb-8 basis-xs'}>
											<ProductItem product={product} />
										</div>
									);
								})
							}
						</div>
					</div>
					<LoadMoreProductsWrapper text={t('shop_page.load_more_items')}>
						<div className={'px-[var(--container-padding)] py-6 bg-black'}>
							<h4 className={'uppercase font-medium text-base text-white py-9'}>
								ORIGINAL PIECES
							</h4>
							<div className='flex flex-col md:flex-row flex-wrap justify-between gap-8'>

								{
									products.products.original_products.map(product => {
										return (
											<div key={product.product_id} className={'pb-8 basis-xs'}>
												<ProductItem dark product={product} />
											</div>
										);
									})
								}
							</div>
						</div>
					</LoadMoreProductsWrapper>
				</div>

			</AppLayout>
		</div>
	)
		;
}