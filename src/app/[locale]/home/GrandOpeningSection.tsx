import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CountdownTimer } from '@/app/[locale]/home/CountdownTimer';
import { Button } from '@mui/material';
import Image from 'next/image';

interface Props {
	images: string[];
}

export function GrandOpeningSection(props: Props) {
	const t = useTranslations('home_page');
	return (
		<div
			className='flex gap-8 relative justify-between pt-[var(--vertical-padding)] px-[var(--container-padding)]'>
			<div className={'basis-sm'}>
				<h3 className={'text-4xl font-bold pb-5 text-[#444444]'}>
					{t('grand_opening')}
				</h3>
				<p className={'pb-3'}>
					{t('grand_opening_description')}
				</p>
				<Link href={'/shop'}>
					<Button variant={'contained'} color={'secondary'}
							sx={{
								color: 'white',
								borderRadius: 0,
								padding: '12px 24px'
							}}>
						{t('pre_order_now')}
					</Button>
				</Link>
				<div className={'pt-6'}>
					<h3 className='text-[#444444] text-2xl font-semibold'>{t('countdown_to_launch')}</h3>
					<CountdownTimer labels={t('countdown_labels').split(', ')} />
				</div>
			</div>
			<div className={'grow flex gap-6 overflow-auto'}>
				{
					props.images.map(image => {
						return (
							<div className={'grow relative'} key={image}>
								<Image style={{
									objectFit: 'contain'
								}} src={image} fill alt={'Grand opening'} />
							</div>
						);
					})
				}
			</div>
		</div>
	);
}