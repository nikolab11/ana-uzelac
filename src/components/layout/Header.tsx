'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { Collection } from '@/types/api.types';
import { CollectionMenuItem } from '@/components/layout/CollectionsMenuItem';
import { useState } from 'react';

interface Props {
	logo: string;
	productsImage: string;
	collections: Collection[];
}

export function Header(props: Props) {
	const t = useTranslations();
	const [collectionsOpen, setCollectionsOpen] = useState(false);
	return (
		<HeaderWrapper>
			<div className='flex justify-center pb-4'>
				<Image src={props.logo} alt={'Logo'} width={80} height={55} />
			</div>
			<div className='flex justify-between pb-4'>
				<div>

				</div>
				<div className='flex flex-1 justify-center gap-[56px]'>
					<Link className={'text-sm app-link'} href={'/'}>{t('news')}</Link>
					<Link className={'text-sm app-link'} href={'/shop'}>{t('news')}</Link>
					<div className={'text-sm app-link'}>
						<CollectionMenuItem open={collectionsOpen}
											onClick={() => setCollectionsOpen(prev => !prev)}
											collections={props.collections} />
					</div>
					<Link className={'text-sm app-link'} href={'/news'}>{t('news')}</Link>
					<Link className={'text-sm app-link'} href={'/about'}>{t('about')}</Link>
				</div>
				<div></div>
			</div>
			<CollectionView image={props.productsImage} collections={props.collections} open={collectionsOpen} />
		</HeaderWrapper>
	);
}

interface CollectionViewProps {
	collections: Collection[];
	open: boolean;
	image: string;
}

function CollectionView(props: CollectionViewProps) {
	const locale = useLocale() as 'eng' | 'fr';
	return (
		<div className={`collection-menu ${props.open ? 'collection-menu-open' : ''}`}>
			<div
				className={`flex gap-9  items-end py-9 `}>
				{
					props.collections.map((collection) => {
						const name = collection[`name_${locale}`];
						return (
							<div className={'basis-[20%]'} key={collection.collection_id}>
								<div className={'font-medium text-xs uppercase pb-2'}>
									Collection
								</div>
								<div className={'font-bold text-xs uppercase pb-2'}>
									{name}
								</div>
								<div>
									<img src={collection.images[0]} alt={name} width={'100%'} height={'auto'} />
								</div>
							</div>
						);
					})
				}
				<div className={'basis-[20%]'}>
					<div className={'font-bold text-xs uppercase pb-2'}>ORIGINAL PIECES</div>
					<div>
						<img src={props.image} alt={'Original pieces'} width={'100%'} height={'auto'} />
					</div>
				</div>
			</div>
		</div>
	);
}