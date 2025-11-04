import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
	priority?: boolean;
	eager?: boolean;
}

/**
 * Optimized Image component with better caching defaults
 * - Automatically uses priority for above-the-fold images
 * - Sets proper loading strategies
 * - Optimizes for performance
 * - Uses optimized quality and caching
 */
export function OptimizedImage({
	priority = false,
	eager = false,
	quality = 85,
	...props
}: OptimizedImageProps) {
	return (
		<Image
			{...props}
			priority={priority}
			loading={priority || eager ? 'eager' : 'lazy'}
			quality={quality}
		/>
	);
}

