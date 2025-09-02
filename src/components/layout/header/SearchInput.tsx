'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
	placeholder: string;
}

export function SearchInput(props: Props) {
	const [value, setValue] = useState('');
	const router = useRouter();
	return (
		<form onSubmit={e => {
			e.preventDefault();
			router.push(`/shop?search=${value}`);
		}} className={'border-b-[var(--foreground)] border-b pb-1 flex gap-1'}>
			<input name='search'
				   value={value}
				   onChange={(e) => {
					   setValue(e.target.value);
				   }}
				   className={'placeholder:text-[var(--foreground)] focus:outline-none focus:ring-0 '}
				   placeholder={props.placeholder} />
		</form>
	);
}