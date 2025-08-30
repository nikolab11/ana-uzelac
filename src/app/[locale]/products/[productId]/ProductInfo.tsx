'use client';

import { Collection, Product } from '@/types/api.types';
import { LocaleType } from '@/types/routing';
import { SizesSection } from '@/app/[locale]/products/[productId]/SizesSection';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { useState } from 'react';
import { useCartContext } from '@/context/cart/cart.context';
import { AddedToCartSnackbar } from '@/app/[locale]/products/[productId]/AddedToCartSnackbar';

interface Props {
	product: Product;
	collections: Collection[];
	locale: LocaleType;
}

export function ProductInfo({ product, locale, collections }: Props) {
	const collection = collections.find(c => c.collection_id === product.collection_id);
	const [selectedSize, setSelectedSize] = useState('');
	const [showError, setShowError] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const onSizeSelect = (size: string) => {
		setSelectedSize(size);
		setShowError(false);
	};
	const { addItem } = useCartContext();
	const onSubmit = () => {
		if (!selectedSize) {
			setShowError(true);
			return;
		}
		addItem(product, selectedSize);
		setOpenSnackbar(true);
	};
	const t = useTranslations('shop_page');
	return (
		<div>
			<AddedToCartSnackbar product={product} size={selectedSize} open={openSnackbar}
								 onClose={() => setOpenSnackbar(false)} />
			<div className={'py-4 bg-[#FFFCF7E6] opacity-80'}>
				<div className={'px-6 py-4 border-white border-b'}>
					<h4 className={'pb-2 text-xl font-normal'}>{product[`name_${locale}`]}</h4>
					<p className={'text-sm font-light'}>{`${product.product_id} ${product.currency}`}</p>
				</div>
				{
					collection && (
						<div
							className={'px-6 py-4 border-white border-b flex justify-between gap-[80px] text-sm font-normal'}>
							<p>
								#Collection
							</p>
							<p>
								{collection[`name_${locale}`]}
							</p>
						</div>
					)
				}
				<SizesSection error={showError ? '#Please choose a size' : undefined} selected={selectedSize}
							  onChange={onSizeSelect}
							  options={product.sizes} />
				<div className={'px-6 py-4 border-white border-b'}>
					<Button className={'w-full'}
							sx={{
								borderRadius: 0
							}}
							onClick={onSubmit}
							startIcon={<ShoppingBag stroke={'white'} size={4} />}
							color={'primary'} variant={'contained'}>{t('add_to_cart')}</Button>
				</div>
				<div className={'px-6 py-4'}>
					<div dangerouslySetInnerHTML={{
						__html: product[`description_${locale}`]
					}} />
				</div>
			</div>
		</div>
	);
}
