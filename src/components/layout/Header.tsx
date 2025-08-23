'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { Collection } from '@/types/api.types';
import { CollectionMenuItem } from '@/components/layout/CollectionsMenuItem';
import { useState } from 'react';

interface Props {
	logo: string;
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
			<div className='flex justify-between'>
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
		</HeaderWrapper>
	);
}

