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
		<div className={'h-full relative bg-[#FCF7F1] flex flex-col md:flex-row'}>
			<div className={'pl-4 md:pl-[var(--container-padding)] relative w-full md:w-[70vw] h-full pr-4 md:pr-9 pt-16 md:pt-[64px] pb-32 md:pb-0'}>
				<BackButton label={t('back_to_shop')} onClick={() => {
					onOpenChange(false);
				}} />
				<div className='flex flex-col sm:flex-row pb-4 md:pb-9 items-start sm:items-center justify-between gap-2 md:gap-0'>
					<h4 className={'uppercase font-medium text-sm md:text-base py-3 md:py-9'}>{t('shopping_cart')}</h4>
					<h4 className={'uppercase font-medium text-xs md:text-base'}>
						{`${totalItems} ${t('item')}`} #Fali mnozina
					</h4>
				</div>
				<div className={'overflow-y-auto pb-20 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0'}>
					<CartItemsGrid />
				</div>
				<div
					className={'absolute left-4 md:left-[var(--container-padding)] bottom-20 md:bottom-[64px] text-[#838383] text-[10px] md:text-xs font-normal'}>
					#Free shipping for all orders
				</div>
			</div>
			<div className={'w-full md:w-auto'}>
				<Drawer variant={'permanent'} anchor={'right'} sx={{
					'& .MuiDrawer-paper': {
						position: { xs: 'sticky', md: 'absolute' },
						width: { xs: '100%', md: '30vw' },
						height: { xs: 'auto', md: '100%' },
						bottom: { xs: 0, md: 'auto' },
						top: { xs: 'auto', md: 0 },
					},
				}}>
					<div className={'px-4 md:px-9 py-4 md:py-6 flex flex-col w-full md:w-[30vw] h-full bg-[#FCF7F1] gap-4 md:gap-9 border-t md:border-t-0 border-[#E5E5E5]'}>
						<div>
							<h4 className={'uppercase font-medium text-sm md:text-base py-2 md:py-9'}>{t('summary')}</h4>
						</div>
						<div className={'grow flex flex-col gap-3 md:gap-4'}>
							<div className={'flex justify-between gap-4 md:gap-9'}>
								<div className={'font-medium text-xs md:text-sm'}>
									{t('subtotal')}
								</div>
								<div className={'font-bold text-xs md:text-sm'}>
									{`${formatNumber(totalPrice)}${EUR_SYMBOL}`}
								</div>
							</div>
							<div className={'flex justify-between gap-4 md:gap-9'}>
								<div className={'font-medium text-xs md:text-sm'}>
									{t('shipping')}
								</div>
								<div className={'font-bold text-xs md:text-sm'}>
									{`${formatNumber(SHIPPING_PRICE)}${EUR_SYMBOL}`}
								</div>
							</div>
						</div>
						<div className={'flex justify-between gap-4 md:gap-9 pt-2 border-t border-[#E5E5E5] md:border-t-0'}>
							<div className={'font-medium text-sm md:text-sm'}>
								{t('total')}
							</div>
							<div className={'font-bold text-sm md:text-sm'}>
								{`${formatNumber(totalPrice + SHIPPING_PRICE)}${EUR_SYMBOL}`}
							</div>
						</div>
						<div>
							<Button color={'primary'} variant={'contained'} sx={{
								borderRadius: 0,
								padding: { xs: '14px 20px', md: '12px 30px' },
								width: '100%',
								fontSize: { xs: '0.875rem', md: '0.875rem' },
								fontWeight: { xs: 600, md: 400 },
								minHeight: { xs: '48px', md: 'auto' },
							}} onClick={() => {
								onOpenChange(true, 'checkout');
							}} className={'touch-manipulation'}>
								{t('checkout_button')}
							</Button>
						</div>
					</div>
				</Drawer>
			</div>
		</div>
	);
}