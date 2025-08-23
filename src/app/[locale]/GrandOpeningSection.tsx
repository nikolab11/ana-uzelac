import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CountdownTimer } from '@/app/[locale]/CountdownTimer';

export function GrandOpeningSection() {
	const t = useTranslations();
	return (
		<div className='flex flex-wrap gap-6 items-center justify-between pt-[64px] pb-[64px] px-9'>
			<div className={'basis-sm'}>
				<h3 className={'text-4xl font-bold pb-5 text-[#444444]'}>
					{t('grand_opening')}
				</h3>
				<p className={'pb-3'}>
					{t('grand_opening_description')}
				</p>
				<Link href={'shop'}>
					<button className={'text-white py-4 px-8 bg-[#DBAC50] cursor-pointer'}>
						{t('pre_order_now')}
					</button>
				</Link>
				<div className={'pt-6'}>
					<h3 className='text-[#444444] text-2xl font-semibold'>{t('countdown_to_launch')}</h3>
					<CountdownTimer labels={t('countdown_labels').split(', ')} />
				</div>
			</div>
		</div>
	);
}