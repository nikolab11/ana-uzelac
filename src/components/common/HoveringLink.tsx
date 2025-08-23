import { ChevronRight } from '@/components/icons/ChevronRight';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
	href: string;
	label: string;
}

export function HoveringLink(props: Props) {
	const t = useTranslations();
	return (
		<Link href={props.href}>
			<div className={'hovering-button'}>
				<div
					className='flex gap-4 items-center'>
					<div className='border border-white p-2 rounded-full'>
						<ChevronRight size={6} stroke='white' />
					</div>
					<div className={'text-white text-base'}>
						{props.label}
					</div>
				</div>
			</div>
		</Link>
	);
}