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
import { Grid } from '@mui/material';
import { notFound } from 'next/navigation';

export default async function ShopPage(props: { searchParams: Promise<Partial<ProductFilterRaw>> }) {
	const params = parseFilters(await props.searchParams);
	const productsResponse = await fetchAllProducts();
	if (!productsResponse) {
		return notFound();
	}
	const usedFilters = (params.sizes?.length || 0) + (params.collection_ids?.length || 0);
	const totalParams = Object.keys(params).length;
	const products = totalParams > 0 ? filterProducts(productsResponse.products.collection_products, params) : productsResponse.products.collection_products;
	const additionalProducts = totalParams > 0 ? filterProducts(productsResponse.products.original_products, params) : productsResponse.products.original_products;
	const prices = calculatePrices(productsResponse);
	return (
		<div>
			<AppLayout headerContent={<ShopHeader
				usedFilters={usedFilters}
				totalProducts={products.length + additionalProducts.length}
				filters={params}
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
				<Grid spacing={2} container className='pt-6'>
					{
						products.map(product => {
							return (
								<Grid key={product.product_id} size={{ xs: 12, sm: 6, md: 4 }} className={'pb-8'}>
									<ProductItem product={product} />
								</Grid>
							);
						})
					}
				</Grid>
			</div>
			{additionalProducts.length > 0 &&
				<LoadMoreProductsWrapper text={t('shop_page.load_more_items')}>
					<div className={'px-[var(--container-padding)] py-6 bg-black'}>
						<h4 className={'uppercase font-medium text-base text-[var(--background)] py-9'}>
							ORIGINAL PIECES
						</h4>
						<div className='flex flex-col md:flex-row flex-wrap justify-between gap-8'>

							{
								additionalProducts.map(product => {
									return (
										<div key={product.product_id} className={'pb-8 basis-xs'}>
											<ProductItem original dark product={product} />
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