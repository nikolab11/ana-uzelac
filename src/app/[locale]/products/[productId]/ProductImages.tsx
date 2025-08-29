'use client';

import { Product } from '@/types/api.types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import { ProductImagesView } from '@/app/[locale]/products/[productId]/ProductImagesView';
import { createPortal } from 'react-dom';

interface Props {
	product: Product;
}

export function ProductImages({ product }: Props) {
	const [activeIndex, setActiveIndex] = useState(0);
	const ref = useRef<HTMLImageElement>(null);
	const [open, setOpen] = useState(false);
	useLayoutEffect(() => {
		if (!ref.current) return;
		const totalWidth = ref.current.scrollWidth;
		const imageWidth = totalWidth / (product.images.length + 0.8);
		ref.current.scrollTo({ behavior: 'smooth', left: Math.max(0, imageWidth * (activeIndex - 0.2)) });
	}, [activeIndex, product.images.length]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<div className={'relative overflow-hidden w-full'}>
			{createPortal(<ProductImagesView images={product.images} open={open}
											 onClose={() => setOpen(false)} />, document.body)}
			<div ref={ref} className={'h-full overflow-hidden w-full'}>
				<div className={`flex`} style={{
					width: `${product.images.length * 50 + 40}%`
				}}>
					{
						product.images.map((image, index) => (
							<img key={index} src={image} alt={'Image'} width={`${100 / (product.images.length + 0.8)}%`}
								 height={'auto'}
								 onClick={() => setOpen(true)} />
						))
					}
				</div>

			</div>
			<div className={'absolute bottom-[64px] left-[80px]'}>
				<ImageCarousel images={product.images} activeIndex={activeIndex} onChange={setActiveIndex} />
			</div>
		</div>
	);
}

