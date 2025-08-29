import { Product } from '@/types/api.types';
import { Button, Snackbar } from '@mui/material';
import { XIcon } from '@/components/icons/XIcon';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleType } from '@/types/routing';

interface Props {
	product: Product;
	size: string;
	open: boolean;
	onClose: () => void;
}

export function AddedToCartSnackbar(props: Props) {
	const locale = useLocale() as LocaleType;
	const t = useTranslations('shop_page');
	return (
		<Snackbar
			open={props.open}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			onClose={props.onClose}
		>
			<div className={'p-5 pl-9 bg-white min-w-[400px]'}>
				<div className={'flex items-center pb-4 gap-[60px] justify-between'}>
					<h4>
						#Added to Cart
					</h4>
					<div onClick={props.onClose} className={'cursor-pointer'}>

						<XIcon size={3} />
					</div>
				</div>
				<div className={'flex items-center pb-8 gap-8 '}>
					<div className={'relative basis-[100px] h-[120px]'}>
						<Image src={props.product.images[0]} fill alt={props.product.name_eng} />
					</div>
					<div>
						<h4 className={'font-semibold text-sm pb-2'}>{props.product[`name_${locale}`]}</h4>
						<p className={'text-sm font-light'}>
							{`${t('size')}: ${props.size}`}
						</p>
					</div>
				</div>
				<div className={'flex items-center gap-2 justify-between'}>
					<button
						className={'grow px-4 py-2 hover:bg-[var(--secondary-color)] hover:text-white transition-all cursor-pointer'}>
						#View cart
					</button>
					<Button className={'grow'} variant={'contained'} color={'primary'}
							sx={{
								padding: '8px 16px',
								borderRadius: 0
							}}
					>
						{t('checkout_button')}
					</Button>
				</div>
			</div>
		</Snackbar>
	);
}