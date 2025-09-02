'use client';
import { CollectionSection } from '@/types/api.types';
import { useLayoutEffect, useRef, useState } from 'react';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import Image from 'next/image';

export function SectionImages({ section }: { section: CollectionSection }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const ref = useRef<HTMLImageElement>(null);
	useLayoutEffect(() => {
		if (!ref.current) {
			return;
		}
		const scrollWidth = ref.current.scrollWidth;

		ref.current.scrollTo({
			behavior: 'smooth',
			left: activeIndex * scrollWidth / section.mainImages.length
		});

	}, [activeIndex, section.mainImages.length]);
	return (
		<div className={'relative'}>
			<div ref={ref} className={'relative'} style={{
				height: '320px',
				width: '100%',
				overflow: 'hidden'
			}}>
				<div className={'flex h-full'} style={{
					width: `${100 * section.mainImages.length}%`
				}}>
					{section.mainImages.map((image, index) => {
						return (
							<div key={index} style={{
								height: '100%',
								width: `${100 / section.mainImages.length}%`,
								position: 'relative'
							}}>
								<Image src={image} fill alt={'sfa'} style={{
									objectFit: 'cover'
								}} />
							</div>
						);
					})}
				</div>


			</div>
			<div className={'absolute bottom-[10px] left-[10px]'}>
				<ImageCarousel images={section.mainImages} activeIndex={activeIndex} onChange={setActiveIndex} />
			</div>
		</div>
	);
}