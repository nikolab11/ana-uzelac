import { BaseNews } from '@/types/api.types';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleType } from '@/types/routing';
import { Link } from '@/i18n/navigation';
import { HoveringButton } from '@/components/common/HoveringButton';

interface Props {
	news: BaseNews;
}

export function NewsItem(props: Props) {
	const locale = useLocale() as LocaleType;
	const title = props.news[`title_${locale}`];
	const t = useTranslations('about_page');
	const description = props.news[`subtitle_${locale}`];
	return (
		<div>
			<img src={props.news.thumbnail} alt={title} width={'100%'} height={'auto'} />
			<h3 className={'text-bold text-base md:text-lg py-2 md:py-4'}>{title}</h3>
			<p className={'text-xs md:text-sm pb-3 md:pb-4'}>{description}</p>
			<Link href={{
				pathname: '/news/[newsId]',
				params: {
					newsId: props.news.id
				}
			}}>
				<HoveringButton label={t('view_more')} mode={'dark'} />
			</Link>
		</div>
	);
}