interface Props {
	stroke?: string;
	className?: string;
	size?: number;
}

export function ChevronUp(props: Props) {
	const size = (props.size || 4) * 4;
	return (
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5}
			 stroke={props.stroke || '#444444'}
			 height={size}
			 width={size}>
			<path strokeLinecap='round' strokeLinejoin='round' d='m4.5 15.75 7.5-7.5 7.5 7.5' />
		</svg>

	);
}