import { fetchAllProducts } from '@/api/products';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductItem } from '@/components/products/ProductItem';
import { LoadMoreProductsWrapper } from '@/app/[locale]/shop/LoadMoreProductsWrapper';
import { parseFilters, Product, ProductFilter, ProductFilterRaw } from '@/types/api.types';
import { ProductActiveFilters } from '@/app/[locale]/shop/ProductActiveFilters';
import { PageProps } from '@/types/pages.types';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleType } from '@/types/routing';
import { calculatePrices, filterProducts } from '@/utils/product.utils';
import { ShopHeader } from '@/app/[locale]/shop/ShopHeader';

export default async function ShopPage(props: { searchParams: Promise<Partial<ProductFilterRaw>> }) {
	const params = parseFilters(await props.searchParams);
	const productsResponse = await fetchAllProducts();
	const usedFilters = (params.sizes?.length || 0) + (params.collection_ids?.length || 0);
	const products = usedFilters > 0 ? filterProducts([...productsResponse.products.collection_products, ...productsResponse.products.original_products], params) : productsResponse.products.collection_products;
	const additionalProducts = usedFilters > 0 ? [] : productsResponse.products.original_products;
	const prices = calculatePrices(productsResponse);
	return (
		<div>
			<AppLayout headerContent={<ShopHeader
				usedFilters={usedFilters}
				totalProducts={products.length + additionalProducts.length}
				minPrice={prices.min}
				maxPrice={prices.max}
			/>}>
				<InnerPage params={params} products={products} additionalProducts={additionalProducts} />
			</AppLayout>
		</div>
	);
}

function InnerPage({ collections, params, products, additionalProducts }: PageProps & {
	params: Partial<ProductFilter>,
	products: Product[],
	additionalProducts: Product[]
}) {
	const locale = useLocale() as LocaleType;
	const t = useTranslations();
	if (!collections) {
		throw new Error('Collections not found');
	}
	return (
		<div>
			<div className={'px-[var(--container-padding)] pb-6'}>
				{
					Object.keys(params).length > 0 && (
						<div className={'pt-2'}>
							<ProductActiveFilters params={params} collections={collections} locale={locale} />
						</div>
					)
				}
				<div className='flex flex-col pt-6 md:flex-row flex-wrap justify-between gap-8'>
					{
						products.map(product => {
							return (
								<div key={product.product_id} className={'pb-8 basis-xs'}>
									<ProductItem product={product} />
								</div>
							);
						})
					}
				</div>
			</div>
			{additionalProducts.length > 0 &&
				<LoadMoreProductsWrapper text={t('shop_page.load_more_items')}>
					<div className={'px-[var(--container-padding)] py-6 bg-black'}>
						<h4 className={'uppercase font-medium text-base text-white py-9'}>
							ORIGINAL PIECES
						</h4>
						<div className='flex flex-col md:flex-row flex-wrap justify-between gap-8'>

							{
								additionalProducts.map(product => {
									return (
										<div key={product.product_id} className={'pb-8 basis-xs'}>
											<ProductItem dark product={product} />
										</div>
									);
								})
							}
						</div>
					</div>
				</LoadMoreProductsWrapper>}
		</div>

	);
}