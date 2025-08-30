import { useLayoutEffect, useRef, useState } from 'react';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import { XIcon } from '@/components/icons/XIcon';
import { IconButton } from '@mui/material';
import Image from 'next/image';

interface Props {
	images: string[];
	open: boolean;
	onClose: () => void;
}

const ZOOM_SCALE = 1.1;

export function ProductImagesView(props: Props) {
	const [active, setActive] = useState(0);
	const ref = useRef<HTMLImageElement>(null);
	const [zoom, setZoom] = useState(3);
	useLayoutEffect(() => {
		console.log(active);
		if (!props.open || !ref.current) {
			return;
		}
		const scrollWidth = ref.current.scrollWidth;

		ref.current.scrollTo({
			behavior: 'smooth',
			left: active * scrollWidth / props.images.length
		});

	}, [active, props.open, props.images.length]);

	if (!props.open) {
		return null;
	}

	return (
		<div ref={ref} className={'fixed flex z-1001 bg-black'}
			 style={{
				 width: `100vw`,
				 height: '100vh',
				 top: 0,
				 overflow: 'auto',
				 overflowX: 'hidden',
				 msOverflowStyle: 'none',
				 scrollbarWidth: 'none'
			 }}
		>
			<div
				className={'fixed top-[60px] bg-white p-2 right-[80px] rounded-full'}>
				<IconButton onClick={props.onClose}>
					<XIcon strokeWidth={1} size={3} />
				</IconButton>
			</div>
			<div className={'flex'} style={{
				width: `${100 * props.images.length}%`
			}}>
				{
					props.images.map((image, index) => {
						return (
							<div key={index} className={'w-screen px-9'}>
								<Image src={image} width={600} height={700} alt={'asfas'}
									   key={image}

								/>
							</div>
						);
					})
				}
			</div>
			<div className={'fixed bottom-[64px] left-[80px]'}>
				<ImageCarousel images={props.images} activeIndex={active} onChange={setActive} />
			</div>
		</div>
	);
}