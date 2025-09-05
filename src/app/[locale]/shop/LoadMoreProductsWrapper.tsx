'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@mui/material';

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
			<Button className={'border border-[var(--foreground)]'}
					color={'primary'} variant={'outlined'}
					sx={{
						borderRadius: 0,
						padding: '8px 12px'
					}}
					onClick={() => setOpen(true)}>{props.text}</Button>
		</div>
	);
}