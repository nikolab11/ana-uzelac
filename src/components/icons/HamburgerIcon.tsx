interface Props {
	stroke?: string;
	size?: number;
	strokeWidth?: number;
}

export function HamburgerIcon(props: Props) {
	const size = (props.size || 4) * 4;
	const stroke = props.stroke || '#444444';
	const strokeWidth = props.strokeWidth || 1.5;
	return (
		<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' height={size}
			 width={size}>
			<path d='M3 12H21M3 6H21M3 18H21' stroke={stroke} strokeWidth={strokeWidth} strokeLinecap='round'
				  strokeLinejoin='round' />
		</svg>
	);
}

