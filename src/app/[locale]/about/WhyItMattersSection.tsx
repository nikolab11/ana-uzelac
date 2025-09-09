import { useTranslations } from 'next-intl';

interface Props {
	image: string;
}

export function WhyItMattersSection({ image }: Props) {
	const t = useTranslations('about_page');
	return (
		<div
			className={'px-[var(--container-padding)] flex-col md:flex-row py-[80px] flex justify-between  gap-9  bg-black'}>
			<div className={'relative basis-sm  grow'}>
				<img src={image} alt={t('why_it_matters')} width={'100%'} height={'auto'} />
			</div>
			<div
				className={'text-center py-[32px] basis-sm grow flex flex-col justify-center items-center gap-4 text-[var(--background)]'}>
				<h3 className={'font-bold text-4xl'}>
					{t('why_it_matters')}
				</h3>
				<p>{t('why_it_matters_description_1')}</p>
				<p>{t('why_it_matters_description_2')}</p>
				<p>{t('why_it_matters_description_3')}</p>
			</div>
		</div>
	);
}