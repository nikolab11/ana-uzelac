'use client';

import { Collection } from '@/types/api.types';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { useTranslationsWithParse } from "@/hooks/useTranslationsWithParse";
import { useCollectionSubmenuContext } from '@/context/collection-submenu/CollectionSubmenu.context';

interface Props {
	collections: Collection[];
}

export function CollectionMenuItem(props: Props) {
	const { t } = useTranslationsWithParse("header");
	const { open, onSwitch } = useCollectionSubmenuContext();
	return (
		<div className='flex gap-3 items-center cursor-pointer' onClick={onSwitch}>
			<span>{t('collections')}</span>
			<ChevronDown strokeWidth={2.5} className={`collection-item-chevron ${open ? 'rotate180' : ''}`} />
		</div>
	);
}


