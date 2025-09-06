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
		<Drawer anchor={'right'} variant={'permanent'}>
			<div className={'px-9 py-6 flex flex-col w-[30vw] h-full bg-[#FCF7F1] gap-9'}>
				<div className={'flex justify-between  gap-9 py-9'}>
					<h4 className={'uppercase font-medium text-base '}>{t('items')}</h4>

					<h4 className={'cursor-pointer font-normal text-sm text-[#ADADAD] hover:text-[var(--text-color)] transition-all'}
						onClick={() => {
							onOpenChange(true, 'cart');
						}}>{t('edit_cart')}</h4>
				</div>
				<div className={'grow overflow-y-auto'}>
					{
						flattened.map(element => {
							return (
								<div key={`${element.product.product_id}-${element.option.size}`}
									 className={'flex justify-between gap-4 pb-9'}>
									<div className={'grow'}>
										<h4 className={'pb-4 font-medium text-sm'}>{element.product[`name_${locale}`]}</h4>
										<p className={'font-normal text-xs'}>{element.option.size}</p>
									</div>
									<div className={'text-sm font-medium'}>
										{`${element.count}x`}
									</div>
									<div className={'text-sm font-bold'}>
										{`${formatNumber(element.option.price)}${EUR_SYMBOL}`}
									</div>
								</div>
							);
						})
					}
				</div>
				<div className={'flex justify-between  gap-9 py-9'}>
					<h4 className={'uppercase font-medium text-base '}>{t('total')}</h4>

					<h4 className={'font-bold text-base'}
					>{`${formatNumber(totalPrice)}${EUR_SYMBOL}`}</h4>
				</div>
			</div>
		</Drawer>
	);
}