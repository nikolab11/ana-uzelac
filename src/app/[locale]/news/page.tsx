import { AppLayout } from '@/components/layout/AppLayout';
import { fetchNews } from '@/api/news';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { NewsItem } from '@/components/news/NewsItem';
import { PageProps } from '@/types/pages.types';
import { BaseNews } from '@/types/api.types';
import { HeadText } from '@/components/common/HeadText';

export default async function NewsPage() {
	const news = await fetchNews();
	return (
		<AppLayout>
			<InnerPage news={news.news} />
		</AppLayout>
	);
}

const SCROLL_ELEMENT_ID = 'news-section';

function InnerPage({ images, news }: PageProps & { news: BaseNews[] }) {
	const t = useTranslations();
	if (!images) {
		throw new Error('Missing images');
	}
	return (
		<>
			<div className='h-full relative'>
				<Image objectFit='cover' src={images.home_page.night_sky_2} alt={'Image'} fill />
				<HeadText title={t('journal_page.the_journal')} buttonLabel={t('about_page.view_more')}
						  scrollElementId={SCROLL_ELEMENT_ID} />
			</div>
			<div id={SCROLL_ELEMENT_ID} className={'px-[var(--container-padding)] py-6'}>
				<div className={'flex flex-wrap gap-9'}>
					{
						news.map(element => {
							return (
								<div key={element.id} className='basis-xs pb-9'>
									<NewsItem news={element} />
								</div>
							);
						})
					}
				</div>
			</div>
		</>
	);
}
