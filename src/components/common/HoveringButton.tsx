'use client';
import { ChevronRight } from '@/components/icons/ChevronRight';
import { ReactNode } from 'react';

interface Props {
	onClick?: () => void;
	label: string;
	icon?: ReactNode;
	mode?: 'dark' | 'light';
}

export function HoveringButton(props: Props) {
	return (
		<div className={`hovering-button ${props.mode === 'dark' ? 'hovering-button-dark' : 'hovering-button-light'}`}
			 onClick={props.onClick}>
			<div
				className='flex gap-4 items-center'>
				<div
					className={`border ${props.mode === 'dark' ? `border-[var(--foreground)]` : 'border-white'} p-2 rounded-full`}>
					{props.icon ||
						<ChevronRight size={6} stroke={props.mode === 'dark' ? 'var(--foreground)' : 'white'} />}
				</div>
				<div className={`text-base ${props.mode === 'dark' ? `text-[var(--foreground)]` : 'text-white'}`}>
					{props.label}
				</div>
			</div>
		</div>
	);
}