interface Props {
  stroke?: string;
  size?: number;
}

export function ChevronRight(props: Props) {
  const size = (props.size || 4) * 4;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={"none"}
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke={props.stroke}
      height={size}
      width={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
