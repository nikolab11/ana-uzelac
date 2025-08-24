'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';
import { CollectionSubmenuContextProvider } from '@/context/collection-submenu/CollectionSubmenu.context-provider';

interface Props {
	children: ReactNode;
}

const baseClassName = 'px-[var(--container-padding)] bg-[#FCF7F1] z-1 absolute w-full hover:opacity-100 transition-all';

export function HeaderWrapper(props: Props) {
	const [scrolled, setScrolled] = useState(false);
	useLayoutEffect(() => {
		const handler = () => {

			const element = document.getElementById('app-container');
			if (!element) {
				return;
			}
			const scrollTop = element.scrollTop;
			setScrolled(scrollTop > 0);

		};
		window.addEventListener('scroll', handler, true);

		return () => {
			window.removeEventListener('scroll', handler);
		};
	}, []);

	return (
		<CollectionSubmenuContextProvider>
			<div
				className={`${baseClassName} opacity-${scrolled ? 100 : 70}`}>
				{props.children}
			</div>
		</CollectionSubmenuContextProvider>
	);
}