import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Collection } from '@/types/api.types';
import { FooterList } from '@/components/layout/FooterList';
import { LocaleType } from '@/types/routing';

interface Props {
	logo: string;
	collections: Collection[];
}

export function Footer(props: Props) {
	const t = useTranslations('footer');
	const locale = useLocale() as LocaleType;
	return (
		<div className={'pt-[48px]'}>
			<div className={'flex justify-between relative py-7 px-[var(--container-padding)]'}>
				<div className={'py-4'}>
					<Image src={props.logo} alt={'Logo'} height={100} width={100} />
				</div>
				<div className={'flex justify-between gap-9'}>
					<FooterList title={'Collections'} items={[{
						name: 'Shop',
						path: '/shop',
						type: 'base'
					}, ...props.collections.map(item => {
						return {
							type: 'dynamic',
							name: item[`name_${locale}`],
							path: '/collections/[collectionId]',
							params: { collectionId: item.collection_id }
						} as const;
					})]} />
					<FooterList title={t('about')} items={[{
						path: '/story',
						name: t('story'),
						type: 'base'
					}, {
						path: '/news',
						type: 'base',
						name: t('news')
					}]} />
					<FooterList title={t('legals')} items={[{
						path: '/privacy-policy',
						type: 'base',
						name: t('privacy_policy')
					}, {
						path: '/terms-conditions',
						type: 'base',
						name: t('terms_conditions')
					}]} />
				</div>
			</div>
			<div className={'border-b-[#E7E7E7] border-b'}></div>
			<div className={'flex justify-between relative p-4 px-[var(--container-padding)]'}>
				<div className={'font-normal text-xs text-[#444444]'}>
					{t('copyright')}
				</div>
			</div>
		</div>
	);
}