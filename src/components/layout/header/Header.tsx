import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { HeaderMode, HeaderWrapper } from '@/components/layout/header/HeaderWrapper';
import { Collection } from '@/types/api.types';
import { CollectionMenuItem } from '@/components/layout/header/CollectionsMenuItem';
import { ShoppingBag } from '@/components/icons/ShoppingBag';
import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { LocalesMenu } from '@/components/layout/header/LocalesMenu';
import { CollectionViewContainer } from '@/components/layout/header/CollectionViewContainer';
import { CollectionsView } from '@/components/layout/header/CollectionView';
import { LocaleType } from '@/types/routing';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SearchInput } from '@/components/layout/header/SearchInput';
import { ReactNode } from 'react';

interface Props {
	logo: string;
	productsImage: string;
	mode: HeaderMode;
	collections: Collection[];
	additionalContent?: ReactNode;
}

export function Header(props: Props) {
	const t = useTranslations('header');
	const locale = useLocale() as LocaleType;
	console.log(props.logo);
	return (
		<HeaderWrapper mode={props.mode}>
			<div className={'relative'}>
				<div className='flex justify-center pb-4'>
					<Image src={props.logo} alt={'Logo'} width={80} height={55} />
				</div>
				<div className='flex justify-between pb-4 overflow-x-auto items-end'>
					<div className={'flex gap-3 items-center'}>
						<SearchIcon />
						<SearchInput placeholder={t('search')} />
					</div>
					<div className='flex flex-1 justify-center items-end gap-[32px]'>
						<Link className={'text-sm app-link'} href={'/home'}>{t('home')}</Link>
						<Link className={'text-sm app-link'} href={'/shop'}>{t('shop')}</Link>
						<div className={'text-sm app-link'}>
							<CollectionMenuItem
								collections={props.collections} />
						</div>
						<Link className={'text-sm app-link'} href={'/news'}>{t('news')}</Link>
						<Link className={'text-sm app-link'} href={'/about'}>{t('about')}</Link>
					</div>
					<div className='flex gap-9 justify-end items-center'>
						<div>
							<div className='flex gap-2 items-center justify-end cursor-pointer'>
								<GlobeIcon size={5} />
								<LocalesMenu locale={locale} />
							</div>
						</div>
						<div className='flex gap-2 items-center justify-end cursor-pointer'>
							<ShoppingBag size={5} />
							<span className={'text-sm'}>{t('cart')}</span>
						</div>
					</div>

				</div>
				<CollectionViewContainer>
					<CollectionsView collections={props.collections} image={props.productsImage} />
				</CollectionViewContainer>
			</div>
			{props.additionalContent}


		</HeaderWrapper>
	);
}

