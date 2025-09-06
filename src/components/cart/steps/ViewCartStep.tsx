import { useCartContext } from '@/context/cart/cart.context';
import { useTranslations } from 'next-intl';
import { CartItemsGrid } from '@/components/cart/CartItemsGrid';
import { Button, Drawer } from '@mui/material';
import { EUR_SYMBOL, SHIPPING_PRICE } from '@/utils/constants';
import { formatNumber } from '@/utils/product.utils';
import { BackButton } from '@/components/common/BackButton';

export function ViewCartStep() {
	const { onOpenChange, totalItems, totalPrice } = useCartContext();

	const t = useTranslations('shop_page');
	return (
		<div className={'h-full bg-[#FCF7F1]'}>
			<div className={'pl-[var(--container-padding)] relative w-[70vw] h-full pr-9 pt-[64px] '}>
				<BackButton label={t('back_to_shop')} onClick={() => {
					onOpenChange(false);
				}} />
				<div className='flex pb-9 items-center justify-between'>
					<h4 className={'uppercase font-medium text-base py-9'}>{t('shopping_cart')}</h4>
					<h4 className={'uppercase font-medium text-base'}>
						{`${totalItems} ${t('item')}`} #Fali mnozina
					</h4>
				</div>
				<CartItemsGrid />
			</div>
			<div>
				<Drawer variant={'permanent'} anchor={'right'}>
					<div className={'px-9 py-6 flex flex-col w-[30vw] h-full bg-[#FCF7F1] gap-9'}>
						<div>
							<h4 className={'uppercase font-medium text-base py-9'}>{t('summary')}</h4>
						</div>
						<div className={'grow flex flex-col gap-4'}>
							<div className={'flex justify-between  gap-9'}>
								<div className={'font-medium text-sm'}>
									{t('subtotal')}
								</div>
								<div className={'font-bold text-sm'}>
									{`${formatNumber(totalPrice)}${EUR_SYMBOL}`}
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
								{`${formatNumber(totalPrice + SHIPPING_PRICE)}${EUR_SYMBOL}`}
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