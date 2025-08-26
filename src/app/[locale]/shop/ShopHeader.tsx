'use client';

import { FilterIcon } from '@/components/icons/FilterIcon';
import { useState } from 'react';
import { FilterModal } from '@/app/[locale]/shop/FilterModal';

interface Props {
	usedFilters: number;
	totalProducts: number;
	minPrice: number;
	maxPrice: number;
}

export function ShopHeader({ totalProducts, usedFilters }: Props) {
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className={'flex justify-between items-center '}>
			<div className={'flex justify-between items-center gap-2 py-3'}>
				<div className={'text-base font-medium '}>#Products</div>
				<div
					className={'font-medium text-[10px] tracking-wider'}>({totalProducts})
				</div>
			</div>
			<div
				onClick={() => setOpenModal(prev => !prev)}
				className={'flex justify-between gap-3 border-l border-l-[#F6F1EB] cursor-pointer relative pl-2 py-3'}>
				<div>
					<FilterIcon />
				</div>
				<div className={'font-medium text-sm leading-[14px]'}>#Filter {usedFilters > 0 &&
					<span
						className={'absolute pl-1 top-[8px] text-[10px] tracking-wider'}>({usedFilters})</span>}</div>

			</div>
			<FilterModal open={openModal} onClose={() => setOpenModal(prev => false)} />
		</div>
	);
}