'use client';

import { ReactNode, useState } from 'react';

interface Props {
	children: ReactNode;
	text: string;
}

export function LoadMoreProductsWrapper(props: Props) {
	const [open, setOpen] = useState(false);

	if (open) {
		return props.children;
	}

	return (
		<div className={'flex justify-center'}>
			<button className={'border border-[var(--foreground)] px-3 py-2 cursor-pointer hover:shadow-lg transition'}
					onClick={() => setOpen(true)}>{props.text}</button>
		</div>
	);
}