'use client';

import { Collection } from '@/types/api.types';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { useTranslations } from 'next-intl';
import { useCollectionSubmenuContext } from '@/context/collection-submenu/CollectionSubmenu.context';

interface Props {
	collections: Collection[];
}

export function CollectionMenuItem(props: Props) {
	const t = useTranslations('header');
	const { open, onSwitch } = useCollectionSubmenuContext();
	return (
		<div className='flex gap-3 items-center cursor-pointer' onClick={onSwitch}>
			<span>{t('collections')}</span>
			<ChevronDown className={`collection-item-chevron ${open ? 'rotate180' : ''}`} />
		</div>
	);
}


