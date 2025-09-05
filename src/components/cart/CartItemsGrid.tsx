import { Grid, IconButton, SxProps, Theme } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useCartContext } from '@/context/cart/cart.context';
import { EUR_SYMBOL } from '@/utils/constants';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { LocaleType } from '@/types/routing';
import { XIcon } from '@/components/icons/XIcon';
import { formatNumber } from '@/utils/product.utils';

const buttonSx: SxProps<Theme> = {
	borderRadius: 0
};

export function CartItemsGrid() {
	const t = useTranslations('shop_page');
	const { items, updateItem, removeItem } = useCartContext();
	const rows = Object.values(items).flatMap(val => {
		return Object.values(val);
	});
	const locale = useLocale() as LocaleType;
	return (
		<div>
			<Grid className={'font-normal text-sm pb-8'} container spacing={2}>
				<Grid size={4}>
					{t('item')}
				</Grid>
				<Grid size={2}>
					{t('size')}
				</Grid>
				<Grid size={3}>
					{t('quantity')}
				</Grid>
				<Grid size={2}>
					{t('price')}
				</Grid>
			</Grid>
			{
				rows.map(row => {
					return (
						<Grid className={'font-normal text-sm mt-5'} container spacing={2}
							  key={`${row.product.product_id}_${row.option.size}`}>
							<Grid size={4}>
								<div className={'flex gap-6 items-center'}>
									<div>
										<Image src={row.product.images[0]} alt={row.product.name_eng} width={100}
											   height={500} />
									</div>
									<div>
										<h4 className={'font-bold '}>{row.product[`name_${locale}`]}</h4>
									</div>
								</div>
							</Grid>
							<Grid size={2}>
								<div className={'flex gap-6 items-center h-full'}>
									{row.option.size}
								</div>
							</Grid>
							<Grid size={3}>
								<div className={'flex gap-3 items-center h-full'}>
									<IconButton sx={buttonSx} disabled={row.count === 1} size={'small'}
												onClick={() => {
													updateItem(row.product, row.option, row.count - 1);
												}}
												color={'primary'}>
										<RemoveIcon />
									</IconButton>
									<div>
										{row.count}
									</div>
									<IconButton onClick={() => {
										updateItem(row.product, row.option, row.count + 1);
									}} sx={buttonSx} size={'small'} color={'primary'}>
										<AddIcon />
									</IconButton>
								</div>
							</Grid>
							<Grid size={2}>
								<div className={'flex gap-6 items-center h-full'}>
									<p className={'font-bold'}>
										{formatNumber(row.option.price * row.count) + EUR_SYMBOL}
									</p>
								</div>

							</Grid>
							<Grid size={1}>
								<div className={'flex items-center h-full'}>
									<IconButton onClick={() => {
										removeItem(row.product, row.option);
									}}>
										<XIcon />
									</IconButton>
								</div>
							</Grid>
						</Grid>
					);
				})
			}
		</div>
	);
}
