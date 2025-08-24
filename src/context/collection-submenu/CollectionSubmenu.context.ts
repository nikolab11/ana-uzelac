'use client';
import { createContext, useContext } from 'react';

interface CollectionSubmenuContextType {
	open: boolean,
	onSwitch?: () => void
}

export const CollectionSubmenuContext = createContext<CollectionSubmenuContextType | null>(null);

export function useCollectionSubmenuContext() {
	const context = useContext(CollectionSubmenuContext);
	if (!context) {
		throw new Error('useCollectionSubmenuContext must be used within CollectionSubmenuContext');
	}
	return context;
}