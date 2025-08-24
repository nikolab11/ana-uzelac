'use client';
import { HoveringButton } from '@/components/common/HoveringButton';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { useCallback } from 'react';

interface Props {
	label: string;
}

export function ScrollingButton(props: Props) {
	const onClick = useCallback(() => {
		const element = document.getElementById('app-container');
		if (!element) return;
		element.scrollBy({
			behavior: 'smooth',
			top: window.innerHeight
		});
	}, []);
	return (
		<HoveringButton label={props.label}
						onClick={onClick}
						icon={<ChevronDown strokeWidth={2.5} stroke={'white'} />} />
	);
}