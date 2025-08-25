'use client';

import { Product } from '@/types/api.types';
import { useLayoutEffect, useRef, useState } from 'react';

interface Props {
	product: Product;
}

const IMAGE_WIDTH = 700;

export function ProductImages({ product }: Props) {
	const [activeIndex, setActiveIndex] = useState(0);
	const ref = useRef<HTMLImageElement>(null);
	const [open, setOpen] = useState(false);
	useLayoutEffect(() => {
		if (!ref.current) return;

		ref.current.scrollTo({ behavior: 'smooth', left: Math.max(0, IMAGE_WIDTH * (activeIndex - 0.5)) });
	}, [activeIndex, product.images.length]);

	return (
		<div ref={ref} className={'h-full relative overflow-x-hidden'}>
			<div className={`flex `} style={{
				width: `${product.images.length * IMAGE_WIDTH + IMAGE_WIDTH}px`
			}}>
				{
					product.images.map((image, index) => (
						<img key={index} src={image} alt={'Image'} width={`${IMAGE_WIDTH}px`}
							 height={'auto'}
							 onClick={() => setOpen(true)} />
					))
				}
			</div>

		</div>
	);
}

