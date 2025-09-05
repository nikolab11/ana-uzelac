import { Button, Drawer } from '@mui/material';
import { useCartContext } from '@/context/cart/cart.context';
import { XIcon } from '@/components/icons/XIcon';
import { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ViewCartStep } from '@/components/cart/steps/ViewCartStep';

const containerStyle: CSSProperties = {
	msOverflowStyle: 'none',
	scrollbarWidth: 'none'
};

export function CartMain() {
	const { open, onOpenChange, items, step } = useCartContext();
	const onClose = () => onOpenChange(false);
	const router = useRouter();
	const pathname = usePathname();
	const hasItems = Object.values(items).flatMap(val => Object.keys(val)).length > 0;
	return (
		<Drawer anchor={'right'} open={open} onClose={onClose}

		>
			<div style={{
				width: hasItems ? '80vw' : '30vw',
				height: '100%'
			}}>
				{
					!hasItems && (
						<EmptyCart onClose={() => {
							onClose();
							if (!pathname.endsWith('/shop')) {
								router.push('/shop');
							}
						}} />
					)
				}
				{
					hasItems && step === 'cart' && (
						<ViewCartStep />
					)
				}
			</div>

		</Drawer>
	);
}

function EmptyCart(props: { onClose: () => void }) {
	const t = useTranslations('shop_page');

	return (
		<div className={'p-9 overflow-auto h-full flex flex-col justify-between'}
		>
			<div className={'flex justify-between items-center pb-7'}>
				<h4 className={'text-medium text-base uppercase text-[var(--text-color)]'}>{t('shopping_cart')}</h4>
				<div onClick={props.onClose} className={'cursor-pointer'}>
					<XIcon size={4} />
				</div>
			</div>
			<div style={containerStyle} className={'overflow-auto grow'}>
				<div className={'flex flex-col h-full items-center justify-center gap-5'}>
					<ShoppingBag size={6} />
					<p className={'text-sm font-normal'}>{t('cart_empty')}</p>
					<Button onClick={props.onClose} className={'font-medium'}
							sx={{ padding: '12px 24px', borderRadius: 0, fontSize: '12px' }}
							variant={'contained'}
							color={'primary'}>#Continue shopping</Button>
				</div>
			</div>


		</div>

	);
}