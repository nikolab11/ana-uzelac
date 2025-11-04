'use client';

import { ReactNode } from 'react';
import { useCollectionSubmenuContext } from '@/context/collection-submenu/CollectionSubmenu.context';

interface Props {
	children: ReactNode;
	isDrawer?: boolean;
}

export function CollectionViewContainer(props: Props) {
	const { open } = useCollectionSubmenuContext();
	const baseClass = props.isDrawer ? 'collection-menu-drawer' : 'collection-menu';
	return (
		<div className={`${baseClass} ${open ? 'collection-menu-open' : ''}`}>
			{props.children}
		</div>
	);
}