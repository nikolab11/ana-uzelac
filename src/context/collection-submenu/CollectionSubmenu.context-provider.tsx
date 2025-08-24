'use client';

import { ReactNode, useState } from 'react';
import { CollectionSubmenuContext } from '@/context/collection-submenu/CollectionSubmenu.context';

interface Props {
	children: ReactNode;
}

export function CollectionSubmenuContextProvider(props: Props) {
	const [open, setOpen] = useState(false);

	const onSwitch = () => setOpen(prev => !prev);

	return (
		<CollectionSubmenuContext.Provider value={{
			onSwitch,
			open
		}}>
			{props.children}
		</CollectionSubmenuContext.Provider>
	);
}