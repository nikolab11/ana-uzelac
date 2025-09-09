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
			className={`absolute w-full h-full flex justify-${props.position || 'center'} flex-col pl-[10%] pr-[10%] flex-wrap gap-7 py-9 items-center`}>
			{props.title && <h3 className={'text-[var(--background)] text-7xl font-bold'}>{props.title}</h3>}
			{props.children}
			{props.buttonLabel && props.scrollElementId && (
				<ScrollingButton label={props.buttonLabel} scrollElementId={props.scrollElementId} />)}
		</div>
	);
}