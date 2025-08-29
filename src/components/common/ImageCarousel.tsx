interface Props {
	images: string[];
	activeIndex: number;
	onChange: (value: number) => void;
}

export function ImageCarousel(props: Props) {
	return (
		<div className={'relative p-1 bg-white'}>
			<div className={`flex gap-1`}>
				{
					props.images.map((image, index) => (
						<img key={index} src={image} alt={'Image'} width={`30px`}
							 height={'auto'}
							 className={'cursor-pointer pb-1'}
							 onClick={() => props.onChange(index)} />
					))
				}
			</div>
			<div
				className={`absolute bottom-[2px] transition-all border-b-[2px] w-[26px] duration-500`} style={{
				left: `${6 + props.activeIndex * 34}px`
			}}>

			</div>
		</div>
	);
}