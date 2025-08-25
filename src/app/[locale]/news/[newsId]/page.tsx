import { AppLayout } from '@/components/layout/AppLayout';
import { fetchNewsById } from '@/api/news';
import Image from 'next/image';
import { News } from '@/types/api.types';
import { LocaleType } from '@/types/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import { HeadText } from '@/components/common/HeadText';

interface Params {
	newsId: string;
}

const CONTENT_ID = 'news-content-id';
export default async function NewsShowPage(props: { params: Promise<Params> }) {
	const [{ newsId }, locale] = await Promise.all([props.params, getLocale() as Promise<LocaleType>]);
	const news = await fetchNewsById(newsId);
	const title = news[`title_${locale}`];
	const t = await getTranslations();
	return (
		<AppLayout>
			<div>
				<div className='min-h-screen relative'>
					<Image objectFit='cover' src={news.thumbnail} alt={'Image'} fill />
					<HeadText title={title} scrollElementId={CONTENT_ID} buttonLabel={t('about_page.view_more')} />
				</div>
				<div id={CONTENT_ID} className={'px-[var(--container-padding)] py-6'}>
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

