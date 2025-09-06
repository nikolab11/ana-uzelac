'use client';

import { useRouter } from '@/i18n/navigation';
import { BackButton } from '@/components/common/BackButton';

export function ProductBackButton() {
	const router = useRouter();
	return (
		<BackButton
			onClick={() => {
				router.push('/shop');
			}} />
	);
}