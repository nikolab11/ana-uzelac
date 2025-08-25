import { AppLayout } from '@/components/layout/AppLayout';
import { PageProps } from '@/types/pages.types';
import Image from 'next/image';
import { HeadText } from '@/components/common/HeadText';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { HoveringButton } from '@/components/common/HoveringButton';
import { ImagesResponse } from '@/types/api.types';
import { WhyItMattersSection } from '@/app/[locale]/about/WhyItMattersSection';
import { DifferentKindOfLuxurySection } from '@/app/[locale]/about/DifferentKindOfLuxurySection';
import { FooterImage } from '@/components/layout/FooterImage';
import { ArtThatFindsYouSection } from '@/app/[locale]/about/ArtThatFindsYouSection';

export default function AboutPage() {

	return (
		<AppLayout>
			<InnerPage />
		</AppLayout>
	);
}
const ABOUT_ELEMENT_ID = 'about-description';

function InnerPage({ images }: PageProps) {
	const t = useTranslations('about_page');
	if (!images) {
		throw new Error('Missing images');
	}
	return (
		<>
			<div className='h-full relative'>
				<Image objectFit='cover' src={images.about_page.img_20230713_wa0047} alt={'Image'} fill />
				<HeadText title={t('founder_story')} buttonLabel={t('view_more')} scrollElementId={ABOUT_ELEMENT_ID} />
			</div>
			<AboutDescription />
			<MainImages images={images} />
			<WhyItMattersSection image={images.about_page.img_20230406_wa0020} />
			<DifferentKindOfLuxurySection images={images} />
			<ArtThatFindsYouSection image={images.about_page.img_20200330_162119} />
			<FooterImage img={images.home_page['ksenija_falling_rabbit_ruins_back']} />
		</>
	);
}

function AboutDescription() {
	const t = useTranslations('about_page');

	return (
		<div id={ABOUT_ELEMENT_ID} className={'bg-black text-white text-center'}>
			<div
				className={'flex flex-col justify-center items-center py-[64px] px-[var(--container-padding)] gap-6'}>
				<h3 className={'font-bold text-4xl'}>{t('about_ana_uzelac')}</h3>
				<p className={'font-normal text-base'}>{t('ana_uzelac_description_1')}</p>
				<p className={'font-normal text-base'}>{t('ana_uzelac_description_2')}</p>
				<p className={'font-normal text-base'}>{t('ana_uzelac_description_3')}</p>
				<p className={'font-normal text-base'}>{t('ana_uzelac_description_4')}</p>
				<Link href={'/shop'}>
					<HoveringButton label={t('explore_collections')} />
				</Link>
			</div>
		</div>
	);
}

function MainImages({ images }: { images: ImagesResponse }) {
	const t = useTranslations('about_page');

	return (
		<div
			className={'px-[var(--container-padding)] h-full py-[64px] flex justify-between gap-6 text-base font-normal text-[#FCF7F1] uppercase'}>
			<div className={'relative grow'}>
				<Image objectFit='cover' src={images.about_page.img_20230713_wa0047} alt={t('ana_uzelac')} fill />
				<HeadText position={'end'}>{t('ana_uzelac')} </HeadText>
			</div>
			<div className={'relative grow '}>
				<Image objectFit='cover' src={images.about_page.img_20230713_wa0047} alt={t('moodboard')} fill />
				<HeadText position={'end'}>{t('moodboard')}</HeadText>
			</div>
			<div className={'relative grow'}>
				<Image objectFit='cover' src={images.about_page.img_20230713_wa0047} alt={t('work_in_progress')}
					   fill />
				<HeadText position={'end'}>
					{t('work_in_progress')}
				</HeadText>
			</div>
		</div>
	);
}

