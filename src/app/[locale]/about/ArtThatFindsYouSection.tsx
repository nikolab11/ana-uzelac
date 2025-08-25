import { useTranslations } from 'next-intl';

interface Props {
	image: string;
}

export function ArtThatFindsYouSection({ image }: Props) {

	const t = useTranslations('about_page');
	return (
		<div
			className={'px-[var(--container-padding)] flex-col md:flex-row py-[80px] flex justify-between  gap-9  bg-black'}>
			<div className={'relative basis-sm  grow'}>
				<img src={image} alt={t('art_that_finds_you')} width={'100%'} height={'auto'} />
			</div>
			<div
				className={'text-center py-[32px] basis-sm grow flex flex-col justify-center items-center gap-4 text-white'}>
				<h3 className={'font-bold text-4xl'}>
					{t('art_that_finds_you')}
				</h3>
				<p>{t('art_that_finds_you_description_1')}</p>
				<p>{t('art_that_finds_you_description_2')}</p>
			</div>
		</div>
	);
}