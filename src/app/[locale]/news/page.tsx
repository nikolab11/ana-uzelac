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

function InnerPage({ images, news }: PageProps & { news: BaseNews[] }) {
	const t = useTranslations();
	if (!images) {
		throw new Error('Missing images');
	}
	return (
		<>
			<div className='h-full relative'>
				<Image objectFit='cover' src={images.home_page.img_0089} alt={'Image'} fill />
				<HeadText title={t('journal_page.the_journal')} buttonLabel={t('about_page.view_more')} />
			</div>
			<div className={'px-[var(--container-padding)] py-6'}>
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
