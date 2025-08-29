import { ImagesResponse } from '@/types/api.types';
import { useTranslations } from 'next-intl';
import { ImageList } from '@mui/material';

interface Props {
	images: ImagesResponse;
}

export function DifferentKindOfLuxurySection(props: Props) {
	const t = useTranslations('about_page');

	return (
		<div className={'px-[var(--container-padding)] py-[80px]'}>
			<div
				className={' flex-col md:flex-row  flex justify-between  gap-9'}>
				<div
					className={'text-center basis-sm grow flex flex-col justify-center items-center gap-4 text-[var(--text-color)] py-[56px]'}>
					<h3 className={'font-bold text-4xl'}>
						{t('a_different_kind_of_luxury')}
					</h3>
					<p>{t('a_different_kind_of_luxury_description_1')}</p>
					<p>{t('a_different_kind_of_luxury_description_2')}</p>
					<p>{t('a_different_kind_of_luxury_description_3')}</p>
				</div>
				<div className={'relative basis-sm  grow'}>
					<img src={props.images.about_page.a_different_kind_of_luxury} alt={t('a_different_kind_of_luxury')}
						 width={'100%'} height={'auto'} />
				</div>

			</div>
			<ImageList variant={'masonry'} className={'pt-[80px]'} cols={2} gap={8}>
				<img className={'pt-2'} src={props.images.about_page.about_page_4}
					 alt={t('a_different_kind_of_luxury')}
					 loading={'lazy'} />
				<img className={'pt-2'} src={props.images.about_page.about_page_6}
					 alt={t('a_different_kind_of_luxury')}
					 loading={'lazy'} />
				<img className={'pt-2'} src={props.images.about_page.about_page_5}
					 alt={t('a_different_kind_of_luxury')}
					 loading={'lazy'} />
				<img className={'pt-2'} src={props.images.about_page.ana}
					 alt={t('a_different_kind_of_luxury')}
					 loading={'lazy'} />
			</ImageList>
		</div>
	)
		;
}