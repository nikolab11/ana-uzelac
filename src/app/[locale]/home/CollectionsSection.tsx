import { Collection } from '@/types/api.types';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ProductsSection } from '@/app/[locale]/home/ProductsSection';
import { HoveringButton } from '@/components/common/HoveringButton';
import { LocaleType } from '@/types/routing';
import { Link } from '@/i18n/navigation';

interface Props {
	collections: Collection[];
}

export function CollectionsSection(props: Props) {
	return (
		<div>
			{
				props.collections.map(collection => {
					return (
						<CollectionItem collection={collection} key={collection.collection_id} />
					);
				})
			}
		</div>
	);
}

function CollectionItem(props: { collection: Collection }) {
	const locale = useLocale() as LocaleType;
	const t = useTranslations('home_page');
	const name = props.collection.title[locale];
	return (
		<div>
			<div key={props.collection.collection_id} className='relative h-[70vh]'>
				<Image fill src={props.collection.images[0]} alt={name} style={{
					objectFit: 'cover'
				}} />
				<div
					className='absolute w-full h-full flex justify-center gap-5 flex-col px-[var(--container-padding)]'>
					<h3 className={'text-[var(--background)] font-bold text-7xl'}>
						{name}
					</h3>
					<div className={'text-[var(--background)] text-base'}>
						{props.collection.subtitle[locale]}
					</div>
					<Link href={{
						pathname: '/collections/[collectionId]',
						params: { collectionId: props.collection.collection_id } as never
					}}>
						<HoveringButton label={t('view_collection')} />
					</Link>

				</div>
			</div>
			<div className={'px-[var(--container-padding)] py-6'}>
				<ProductsSection products={props.collection.products} />
			</div>
		</div>
	);
}