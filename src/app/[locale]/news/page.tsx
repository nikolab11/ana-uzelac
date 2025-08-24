import { AppLayout } from '@/components/layout/AppLayout';
import { fetchNews } from '@/api/news';
import Image from 'next/image';
import { fetchImages } from '@/api/images';
import { useTranslations } from 'next-intl';
import { ScrollingButton } from '@/components/common/ScrollingButton';
import { NewsItem } from '@/components/news/NewsItem';

export default async function NewsPage() {
	const news = await fetchNews();
	const images = await fetchImages();
	return (
		<AppLayout>
			<div className='min-h-screen relative'>
				<Image objectFit='cover' src={images.home_page.img_0089} alt={'Image'} fill />
				<HeadText />
			</div>
			<div className={'px-[var(--container-padding)] py-6'}>
				<div className={'flex flex-wrap gap-9'}>
					{
						news.news.map(element => {
							return (
								<div key={element.id} className='basis-xs pb-9'>
									<NewsItem news={element} />
								</div>
							);
						})
					}
				</div>
			</div>
		</AppLayout>
	);
}

function HeadText() {
	const t = useTranslations();
	return (
		<div
			className={'absolute w-full h-full flex justify-center flex-col pl-[10%] pr-[10%] flex-wrap gap-7 items-center'}>
			<h3 className={'text-white text-7xl font-bold'}>{t('journal_page.the_journal')}</h3>
			<ScrollingButton label={t('about_page.view_more')} />
		</div>
	);
}