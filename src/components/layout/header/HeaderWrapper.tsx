'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';
import { CollectionSubmenuContextProvider } from '@/context/collection-submenu/CollectionSubmenu.context-provider';

export type HeaderMode = 'hover' | 'regular'

interface Props {
	children: ReactNode;
	mode: HeaderMode;
}

const baseClassName = 'px-[var(--container-padding)] bg-[#FCF7F1] z-1 w-full hover:opacity-100 transition-all';

export function HeaderWrapper(props: Props) {
	const [scrolled, setScrolled] = useState(false);
	useLayoutEffect(() => {
		if (props.mode === 'regular') {
			return;
		}
		const handler = () => {

			const element = document.getElementById('app-container');
			if (!element) {
				return;
			}
			const scrollTop = element.scrollTop;
			console.log(scrollTop);
			setScrolled(scrollTop > 0);

		};
		window.addEventListener('scroll', handler, true);

		return () => {
			window.removeEventListener('scroll', handler);
		};
	}, [props.mode]);

	return (
		<CollectionSubmenuContextProvider>
			<div
				className={baseClassName} style={{
				opacity: (scrolled || props.mode === 'regular') ? '1' : '0.7',
				position: props.mode === 'hover' ? 'absolute' : 'relative'
			}}>
				{props.children}
			</div>
		</CollectionSubmenuContextProvider>
	);
}