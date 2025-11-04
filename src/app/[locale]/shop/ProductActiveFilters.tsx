'use client';

import { Collection, ProductFilter } from '@/types/api.types';
import { LocaleType } from '@/types/routing';
import { ReactNode } from 'react';
import { XIcon } from '@/components/icons/XIcon';
import { useRouter } from 'next/navigation';
import * as querystring from 'querystring';
import { EUR_SYMBOL } from '@/utils/constants';

interface Props {
	params: Partial<ProductFilter>;
	locale: LocaleType;
	collections: Collection[];
}

export function ProductActiveFilters({ params, collections, locale }: Props) {
	const router = useRouter();

	const updateParams = (updateParams: (old: Partial<ProductFilter>) => Partial<ProductFilter>) => {
		const updatedParams = updateParams(params);
		const stringified = querystring.stringify(updatedParams);
		if (stringified) {
			router.replace(`/shop?${stringified}`);
			return;
		}
		router.replace('/shop');
	};

	return (
		<div className={'flex overflow-x-auto gap-3 md:gap-5 pb-2 md:pb-0'}>
			{
				(params.price_min || params.price_max) && (
					<FilterItem content={getPriceFilterTitle(params)} onDelete={() => {

						updateParams(prev => {
							return {
								...prev,
								price_min: undefined,
								price_max: undefined
							};
						});
					}} />
				)
			}
			{
				params.search && (
					<FilterItem content={params.search} onDelete={() => {

						updateParams(prev => {
							return {
								...prev,
								search: undefined
							};
						});
					}} />
				)
			}
			{
				params.collection_ids?.map(collectionId => {
					const collection = collections.find((collection) => collection.collection_id === collectionId);
					if (!collection) {
						return null;
					}
					return (
						<FilterItem content={collection.title[locale]} key={collectionId} onDelete={() => {
							updateParams(prev => {
								return {
									...prev,
									collection_ids: prev.collection_ids?.filter(c => c !== collectionId)
								};
							});
						}} />
					);
				})
			}
			{
				params.sizes?.map(size => {
					return (
						<FilterItem content={size} key={size} onDelete={() => {
							updateParams(prev => {
								return {
									...prev,
									sizes: prev.sizes?.filter(c => c !== size)
								};
							});
						}} />
					);
				})
			}
		</div>
	);
}

function getPriceFilterTitle(params: Partial<ProductFilter>) {
	if (params.price_min === undefined && params.price_max === undefined) {
		return '';
	}
	const priceMin = params.price_min === undefined ? '0' : `${params.price_min}${EUR_SYMBOL}`;
	const priceMax = params.price_max === undefined ? '/' : `${params.price_max}${EUR_SYMBOL}`;
	return `${priceMin} - ${priceMax}`;
}

interface FilterItemProps {
	content: ReactNode;
	onDelete?: () => void;
}

function FilterItem(props: FilterItemProps) {
	return (
		<div className={'bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-2xl flex gap-2 md:gap-3 justify-between items-center whitespace-nowrap'}>
			<div className='text-xs font-medium'>{props.content}</div>
			<div onClick={props.onDelete} className={'cursor-pointer flex-shrink-0'}>
				<XIcon />
			</div>
		</div>
	);
}