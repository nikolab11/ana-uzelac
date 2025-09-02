import Image from 'next/image';

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
						<div key={index} style={{
							width: '30px',
							height: '40px',
							position: 'relative'
						}}>
							<Image src={image} alt={'Image'} fill
								   style={{
									   objectFit: 'cover'
								   }}
								   className={'cursor-pointer pb-1'}
								   onClick={() => props.onChange(index)} />
						</div>
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