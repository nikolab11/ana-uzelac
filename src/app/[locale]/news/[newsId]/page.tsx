import { AppLayout } from '@/components/layout/AppLayout';
import { fetchNewsById } from '@/api/news';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ScrollingButton } from '@/components/common/ScrollingButton';
import { News } from '@/types/api.types';
import { LocaleType } from '@/types/routing';
import { getLocale } from 'next-intl/server';

interface Params {
	newsId: string;
}

export default async function NewsShowPage(props: { params: Promise<Params> }) {
	const [{ newsId }, locale] = await Promise.all([props.params, getLocale() as Promise<LocaleType>]);
	const news = await fetchNewsById(newsId);
	return (
		<AppLayout>
			<div>
				<div className='min-h-screen relative'>
					<Image objectFit='cover' src={news.thumbnail} alt={'Image'} fill />
					<HeadText news={news} />
				</div>
				<div className={'px-[var(--container-padding)] py-6'}>
					<div className={'flex flex-col gap-4 content-wrapper'} dangerouslySetInnerHTML={{
						__html: news[`content_${locale}`]
					}} />
				</div>
			</div>
		</AppLayout>
	);
}

interface HeadTextProps {
	news: News;
}

function HeadText(props: HeadTextProps) {
	const t = useTranslations();
	const locale = useLocale() as LocaleType;
	const title = props.news[`title_${locale}`];
	return (
		<div
			className={'absolute w-full h-full flex justify-center flex-col pl-[10%] pr-[10%] flex-wrap gap-7 items-center'}>
			<h3 className={'text-white text-7xl font-bold'}>{title}</h3>
			<ScrollingButton label={t('about_page.view_more')} />
		</div>
	);
}