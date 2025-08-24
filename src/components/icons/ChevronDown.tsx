interface Props {
	stroke?: string;
	className?: string;
	strokeWidth?: number;
	size?: number;
}

export function ChevronDown(props: Props) {
	const size = (props.size || 4) * 4;
	return (
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={props.strokeWidth || 1.5}
			 stroke={props.stroke || 'var(--foreground)'}
			 height={size}
			 width={size}
			 className={props.className}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
		</svg>

	);
}