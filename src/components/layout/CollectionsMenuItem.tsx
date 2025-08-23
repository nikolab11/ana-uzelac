'use client';

import { Collection } from '@/types/api.types';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { ChevronDown } from '@/components/icons/ChevronDown';

interface Props {
	collections: Collection[];
	open?: boolean;
	onClick?: () => void;
}

export function CollectionMenuItem(props: Props) {

	return (
		<div className='flex gap-3 items-center cursor-pointer' onClick={props.onClick}>
			<span>Collections</span>
			{
				props.open && <ChevronUp />
			}
			{
				!props.open && (<ChevronDown />)
			}
		</div>
	);
}


