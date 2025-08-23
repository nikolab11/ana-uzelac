import { fetchAllProducts } from '@/api/products';

export default async function ShopPage() {

	const products = await fetchAllProducts();
	return (
		<div>
			<div className={'flex gap-3 justify-between flex-wrap'}>
				{JSON.stringify(products)}
			</div>
		</div>
	);
}