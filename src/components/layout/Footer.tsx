import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Collection } from '@/types/api.types';
import { FooterList } from '@/components/layout/FooterList';

interface Props {
	logo: string;
	collections: Collection[];
}

export function Footer(props: Props) {
	const t = useTranslations();
	const locale = useLocale() as 'eng' | 'fr';
	return (
		<div className={'pt-[48px]'}>
			<div className={'flex justify-between relative p-7'}>
				<div className={'pl-[48px] py-4'}>
					<Image src={props.logo} alt={'Logo'} height={100} width={100} />
				</div>
				<div className={'flex justify-between gap-9'}>
					<FooterList title={'Collections'} items={[{
						name: 'Shop',
						path: 'shop'
					}, ...props.collections.map(item => {
						return {
							name: item[`name_${locale}`],
							path: '/collections/' + item.collection_id
						};
					})]} />
					<FooterList title={t('about')} items={[{
						path: 'story',
						name: t('story')
					}, {
						path: 'news',
						name: t('news')
					}]} />
					<FooterList title={t('legals')} items={[{
						path: 'privacy-policy',
						name: t('privacy_policy')
					}, {
						path: 'terms-conditions',
						name: t('terms_conditions')
					}]} />
				</div>
			</div>
			<div className={'border-b-[#E7E7E7] border-b'}></div>
			<div className={'flex justify-between relative p-4'}>
				<div className={'font-normal text-xs text-[#444444]'}>
					{t('copyright')}
				</div>
			</div>
		</div>
	);
}