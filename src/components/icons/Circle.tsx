interface Props {
	stroke?: string;
	className?: string;
	size?: number;
	strokeWidth?: number;
	fill?: string;
}

export function Circle(props: Props) {
	const size = (props.size || 4) * 4;
	return (
		<svg fill={props.fill || 'none'} viewBox='0 0 24 24' strokeWidth={props.strokeWidth || 1.5}
			 stroke={props.stroke || 'var(--foreground)'}
			 height={size}
			 width={size}
			 className={props.className}>
			<path d={'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2'}>

			</path>
		</svg>
	);
}