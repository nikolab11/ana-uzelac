import { useCartContext } from '@/context/cart/cart.context';
import { useTranslations } from 'next-intl';
import { CartItemsGrid } from '@/components/cart/CartItemsGrid';
import { Button, Drawer } from '@mui/material';
import { EUR_SYMBOL, SHIPPING_PRICE } from '@/utils/constants';
import { formatNumber } from '@/utils/product.utils';

export function ViewCartStep() {
	const { items, onOpenChange } = useCartContext();
	const flatted = Object.values(items).flatMap(val => Object.values(val));
	const subtotal = flatted.reduce((acc, value) => {
		return acc + value.count * value.option.price;
	}, 0);
	const t = useTranslations('shop_page');
	return (
		<div className={'h-full'}>
			<div className={'px-9 w-[70%] h-full bg-[#FCF7F1]'}>
				<div className='flex pb-9 items-center justify-between'>
					<h4 className={'uppercase font-medium text-base py-9'}>{t('shopping_cart')}</h4>
					<h4 className={'uppercase font-medium text-base'}>
						{`${flatted.length} ${t('item')}`} #Fali mnozina
					</h4>
				</div>
				<CartItemsGrid />
			</div>
			<div>
				<Drawer elevation={8} variant={'permanent'} anchor={'right'}>
					<div className={'px-9 py-6 flex flex-col w-[24vw] h-full bg-[#FCF7F1] gap-9'}>
						<div>
							<h4 className={'uppercase font-medium text-base py-9'}>{t('summary')}</h4>
						</div>
						<div className={'grow flex flex-col gap-4'}>
							<div className={'flex justify-between  gap-9'}>
								<div className={'font-medium text-sm'}>
									{t('subtotal')}
								</div>
								<div className={'font-bold text-sm'}>
									{`${formatNumber(subtotal)}${EUR_SYMBOL}`}
								</div>
							</div>
							<div className={'flex justify-between gap-9'}>
								<div className={'font-medium text-sm'}>
									{t('shipping')}
								</div>
								<div className={'font-bold text-sm'}>
									{`${formatNumber(SHIPPING_PRICE)}${EUR_SYMBOL}`}
								</div>
							</div>
						</div>
						<div className={'flex justify-between  gap-9'}>
							<div className={'font-medium text-sm'}>
								{t('total')}
							</div>
							<div className={'font-bold text-sm'}>
								{`${formatNumber(subtotal + SHIPPING_PRICE)}${EUR_SYMBOL}`}
							</div>
						</div>
						<div>
							<Button color={'primary'} variant={'contained'} sx={{
								borderRadius: 0,
								padding: '12px 30px',
								width: '100%'
							}} onClick={() => {
								onOpenChange(true, 'checkout');
							}}>
								{t('checkout_button')}
							</Button>
						</div>
					</div>
				</Drawer>
			</div>
		</div>
	);
}