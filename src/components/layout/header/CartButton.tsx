'use client';

import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { useCartContext } from '@/context/cart/cart.context';

interface Props {
	label: string;
	hideLabel?: boolean;
}

export function CartButton(props: Props) {
	const { onOpenChange, totalItems } = useCartContext();
	return (
		<div onClick={() => onOpenChange(true)} className='flex gap-2 items-center justify-end cursor-pointer'>
			<div className={'relative'}>
				<ShoppingBag size={5} />
				{
					totalItems > 0 && (
						<div
							className={'absolute top-[10px] font-normal bg-[#FCF7F1] px-[2px] text-[10px] rounded-full right-[0px]'}>{totalItems}</div>
					)
				}
			</div>
			{!props.hideLabel && <span className={'text-sm'}>{props.label}</span>}
		</div>
	);
}