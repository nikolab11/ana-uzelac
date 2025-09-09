import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { HeaderMode, HeaderWrapper } from '@/components/layout/header/HeaderWrapper';
import { Collection } from '@/types/api.types';
import { CollectionMenuItem } from '@/components/layout/header/CollectionsMenuItem';
import { GlobeIcon } from '@/components/icons/GlobeIcon';
import { LocalesMenu } from '@/components/layout/header/LocalesMenu';
import { CollectionViewContainer } from '@/components/layout/header/CollectionViewContainer';
import { CollectionsView } from '@/components/layout/header/CollectionView';
import { LocaleType } from '@/types/routing';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SearchInput } from '@/components/layout/header/SearchInput';
import { ReactNode } from 'react';
import { CartButton } from '@/components/layout/header/CartButton';
import { HeaderLink } from '@/components/layout/header/HeaderLink';

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
	return (
		<HeaderWrapper mode={props.mode}>
			<div className={'relative'}>
				<Link href={'/home'}>
					<div className='flex justify-center pb-4'>
						<Image src={props.logo} alt={'Logo'} width={80} height={55} />
					</div>
				</Link>
				<div className='flex justify-between pb-4 overflow-x-auto items-end'>
					<div className={'flex gap-3 items-center'}>
						<SearchIcon />
						<SearchInput placeholder={t('search')} />
					</div>
					<div className='flex flex-1 justify-center items-end gap-[32px]'>
						<HeaderLink
							href={'/home'}>{t('home')}</HeaderLink>
						<HeaderLink
							href={'/shop'}>{t('shop')}</HeaderLink>
						<div className={'text-sm app-link'}>
							<CollectionMenuItem
								collections={props.collections} />
						</div>
						<HeaderLink
							href={'/news'}>{t('news')}</HeaderLink>
						<HeaderLink
							href={'/about'}>{t('about')}</HeaderLink>
					</div>
					<div className='flex gap-9 justify-end items-center'>
						<div>
							<div className='flex gap-2 items-center justify-end cursor-pointer'>
								<GlobeIcon size={5} />
								<LocalesMenu locale={locale} />
							</div>
						</div>
						<CartButton label={t('cart')} />
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

