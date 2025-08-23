interface Props {
	stroke?: string;
	className?: string;
	size?: number;
}

export function ChevronLeft(props: Props) {
	const size = props.size || 4;
	return (
		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke={props.stroke}
			 className={`size-${size}`}>
			<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
		</svg>

	);
}