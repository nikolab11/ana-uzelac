'use client';
import { ReactNode, useState } from 'react';

interface Props {
	title: ReactNode;
	children: ReactNode;
	initialState?: boolean;
}

export function Section(props: Props) {
	const [open, setOpen] = useState(props.initialState || false);
	return (
		<div className={'p-4'}>
			<div onClick={() => setOpen(prev => !prev)} className={'flex items-center justify-between py-4'}>
				<div className={'font-medium text-xs'}>{props.title}</div>
				<div></div>
			</div>
			<div className={`collection-menu ${open ? 'collection-menu-open' : ''}`}>
				{props.children}
			</div>
		</div>
	);
}