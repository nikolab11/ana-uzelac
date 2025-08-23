'use client';

import { ReactNode, useLayoutEffect, useRef } from 'react';

interface Props {
	children: ReactNode;
}

const baseClassName = 'bg-white z-1 p-3 absolute w-full hover:opacity-100 opacity-70 transition-all';

export function HeaderWrapper(props: Props) {
	const ref = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		const handler = () => {
			if (!ref.current) {
				return;
			}
			const element = document.getElementById('app-container');
			if (!element) {
				return;
			}
			const scrollTop = element.scrollTop;
			const windowHeight = element.offsetHeight;
			const documentHeight = element.scrollHeight;
			// Check if scrolled to bottom
			if (scrollTop + windowHeight >= documentHeight) {
				ref.current.className = `${baseClassName} opacity-100`;
			} else {

				ref.current.className = `${baseClassName} opacity-70`;
			}
		};
		window.addEventListener('scroll', handler, true);

		return () => {
			window.removeEventListener('scroll', handler);
		};
	}, []);

	return (
		<div ref={ref}
			 className='z-1 p-3 absolute w-full hover:opacity-100 opacity-70 transition-all bg-[#FCF7F1]'>
			{props.children}
		</div>
	);
}