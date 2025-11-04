import { ScrollingButton } from '@/components/common/ScrollingButton';
import React, { ReactNode } from 'react';

interface Props {
	title?: string;
	buttonLabel?: string;
	position?: 'start' | 'end' | 'center';
	children?: ReactNode;
	scrollElementId?: string;
}

export function HeadText(props: Props) {
	return (
		<div
			className={`absolute w-full h-full flex justify-${props.position || 'center'} flex-col pl-[5%] md:pl-[10%] pr-[5%] md:pr-[10%] flex-wrap gap-2 md:gap-7 py-4 md:py-9 items-center`}>
			{props.title && <h3 className={'text-[var(--background)] text-3xl md:text-7xl font-bold text-center'}>{props.title}</h3>}
			{props.children}
			{props.buttonLabel && props.scrollElementId && (
				<ScrollingButton label={props.buttonLabel} scrollElementId={props.scrollElementId} />)}
		</div>
	);
}