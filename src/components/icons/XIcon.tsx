interface Props {
	stroke?: string;
	size?: number;
	strokeWidth?: number;
}

export function XIcon(props: Props) {
	const size = (props.size || 4) * 4;
	return (
		<svg viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg' height={size}
			 width={size}>
			<path d='M1 1L7 7M1 7L7 1' stroke='#444444' strokeWidth={props.strokeWidth || 1} strokeLinecap='round'
				  strokeLinejoin='round' />
		</svg>

	);
}