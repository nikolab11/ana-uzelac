import { Drawer } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useCartContext } from '@/context/cart/cart.context';
import { LocaleType } from '@/types/routing';
import { formatNumber } from '@/utils/product.utils';
import { EUR_SYMBOL } from '@/utils/constants';

export function ItemsDrawer() {
	const t = useTranslations('shop_page');
	const { onOpenChange, items, totalPrice } = useCartContext();
	const flattened = Object.values(items).flatMap(val => Object.values(val));
	const locale = useLocale() as LocaleType;
	return (
		<Drawer anchor={'right'} variant={'permanent'} sx={{
			'& .MuiDrawer-paper': {
				position: { xs: 'relative', md: 'absolute' },
				width: { xs: '100%', md: '30vw' },
				height: { xs: 'auto', md: '100%' },
				border: { xs: '1px solid #E5E5E5', md: 'none' },
				borderRadius: { xs: '8px', md: 0 },
			},
		}}>
			<div className={'px-4 md:px-9 py-4 md:py-6 flex flex-col w-full md:w-[30vw] h-full bg-[#FCF7F1] gap-4 md:gap-9'}>
				<div className={'flex justify-between gap-4 md:gap-9 py-3 md:py-9'}>
					<h4 className={'uppercase font-medium text-sm md:text-base'}>{t('items')}</h4>

					<h4 className={'cursor-pointer font-normal text-xs md:text-sm text-[#ADADAD] hover:text-[var(--text-color)] transition-all touch-manipulation'}
						onClick={() => {
							onOpenChange(true, 'cart');
						}}>{t('edit_cart')}</h4>
				</div>
				<div className={'grow overflow-y-auto max-h-[200px] md:max-h-none'}>
					{
						flattened.map(element => {
							return (
								<div key={`${element.product.product_id}-${element.option.size}`}
									 className={'flex justify-between gap-3 md:gap-4 pb-4 md:pb-9'}>
									<div className={'grow min-w-0'}>
										<h4 className={'pb-2 md:pb-4 font-medium text-xs md:text-sm leading-tight'}>{element.product[`name_${locale}`]}</h4>
										<p className={'font-normal text-[10px] md:text-xs'}>{element.option.size}</p>
									</div>
									<div className={'text-xs md:text-sm font-medium flex-shrink-0'}>
										{`${element.count}x`}
									</div>
									<div className={'text-xs md:text-sm font-bold flex-shrink-0'}>
										{`${formatNumber(element.option.price)}${EUR_SYMBOL}`}
									</div>
								</div>
							);
						})
					}
				</div>
				<div className={'flex justify-between gap-4 md:gap-9 py-3 md:py-9 border-t border-[#E5E5E5]'}>
					<h4 className={'uppercase font-medium text-sm md:text-base'}>{t('total')}</h4>

					<h4 className={'font-bold text-sm md:text-base'}
					>{`${formatNumber(totalPrice)}${EUR_SYMBOL}`}</h4>
				</div>
			</div>
		</Drawer>
	);
}