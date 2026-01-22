'use client';
import { HoveringButton } from '@/components/common/HoveringButton';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { ReactNode, useCallback } from 'react';

interface Props {
	label: ReactNode;
	scrollElementId: string;
}

export function ScrollingButton(props: Props) {
	const onClick = useCallback(() => {
		const element = document.getElementById(props.scrollElementId);
		if (!element) return;
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest'
		});
	}, [props.scrollElementId]);
	return (
		<HoveringButton label={props.label}
						onClick={onClick}
						icon={<ChevronDown strokeWidth={2.5} stroke={'white'} />} />
	);
}