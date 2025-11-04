'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
	images: string[];
	activeIndex: number;
	onChange: (value: number) => void;
}

export function ImageCarousel(props: Props) {
	const [isMobile, setIsMobile] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const getIndicatorLeft = (index: number) => {
		if (!mounted) {
			// Default to mobile calculation during SSR
			return 3 + index * 28;
		}
		if (isMobile) {
			return 3 + index * 28; // 24px width + 4px gap = 28px per item
		}
		return 6 + index * 34; // 30px width + 4px gap = 34px per item
	};
	
	return (
		<div className={'relative p-0.5 md:p-1 bg-white'}>
			<div className={`flex gap-0.5 md:gap-1`}>
				{
					props.images.map((image, index) => (
						<div key={index} className={'relative w-6 h-8 md:w-[30px] md:h-[40px]'}>
							<Image src={image} alt={'Image'} fill
								   style={{
									   objectFit: 'cover'
								   }}
								   className={'cursor-pointer pb-0.5 md:pb-1 touch-manipulation'}
								   onClick={() => props.onChange(index)} />
						</div>
					))
				}
			</div>
			<div
				className={`absolute bottom-[1px] md:bottom-[2px] transition-all border-b-[2px] w-5 md:w-[26px] duration-500 border-[var(--foreground)]`} 
				style={{
					left: `${getIndicatorLeft(props.activeIndex)}px`
				}}>

			</div>
		</div>
	);
}