import { Button, Drawer } from '@mui/material';
import { useCartContext } from '@/context/cart/cart.context';
import { XIcon } from '@/components/icons/XIcon';
import { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { usePathname, useRouter } from '@/i18n/navigation';

const containerStyle: CSSProperties = {
	msOverflowStyle: 'none',
	scrollbarWidth: 'none'
};

export function CartMain() {
	const { open, onOpenChange, items } = useCartContext();
	const t = useTranslations('shop_page');
	const onClose = () => onOpenChange(false);
	const router = useRouter();
	const pathname = usePathname();
	const hasItems = Object.keys(items).length > 0;
	return (
		<Drawer anchor={'right'} open={open} onClose={onClose}>
			<div className={'p-9 w-[35vw] overflow-auto h-full flex flex-col justify-between'}>
				<div className={'flex justify-between items-center pb-7'}>
					<h4 className={'text-medium text-base uppercase text-[var(--text-color)]'}>{t('shopping_cart')}</h4>
					<div onClick={onClose} className={'cursor-pointer'}>
						<XIcon size={4} />
					</div>
				</div>
				<div style={containerStyle} className={'overflow-auto grow'}>

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

				</div>

			</div>

		</Drawer>
	);
}

function EmptyCart(props: { onClose: () => void }) {
	const t = useTranslations('shop_page');

	return (
		<div className={'flex flex-col h-full items-center justify-center gap-5'}>
			<ShoppingBag size={6} />
			<p className={'text-sm font-normal'}>{t('cart_empty')}</p>
			<Button onClick={props.onClose} className={'font-medium'}
					sx={{ padding: '12px 24px', borderRadius: 0, fontSize: '12px' }}
					variant={'contained'}
					color={'primary'}>#Continue shopping</Button>
		</div>
	);
}