'use client';

import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { useCartContext } from '@/context/cart/cart.context';

interface Props {
	label: string;
}

export function CartButton(props: Props) {
	const { items, onOpenChange } = useCartContext();
	const count = Object.values(items).flatMap(val => Object.keys(val)).length;
	return (
		<div onClick={() => onOpenChange(true)} className='flex gap-2 items-center justify-end cursor-pointer'>
			<div className={'relative'}>
				<ShoppingBag size={5} />
				{
					count > 0 && (
						<div
							className={'absolute top-[10px] font-normal bg-[#FCF7F1] px-[2px] text-[10px] rounded-full right-[0px]'}>{count}</div>
					)
				}
			</div>
			<span className={'text-sm'}>{props.label}</span>
		</div>
	);
}