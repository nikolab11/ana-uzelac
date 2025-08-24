'use client';

import { ReactNode } from 'react';
import { useCollectionSubmenuContext } from '@/context/collection-submenu/CollectionSubmenu.context';

interface Props {
	children: ReactNode;
}

export function CollectionViewContainer(props: Props) {
	const { open } = useCollectionSubmenuContext();
	return (
		<div className={`collection-menu ${open ? 'collection-menu-open' : ''}`}>
			{props.children}
		</div>
	);
}