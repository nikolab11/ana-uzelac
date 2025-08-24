import { Collection } from '@/types/api.types';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ProductsSection } from '@/app/[locale]/home/ProductsSection';
import { HoveringLink } from '@/components/common/HoveringLink';
import { LocaleType } from '@/types/routing';

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
	const name = props.collection[`name_${locale}`];
	return (
		<div>
			<div key={props.collection.collection_id} className='relative h-[70vh]'>
				<Image fill src={props.collection.images.smisleno_ime_1} alt={name} objectFit='cover' />
				<div className='absolute w-full h-full flex justify-center gap-5 flex-col pl-[98px]'>
					<h3 className={'text-white font-bold text-7xl'}>
						{name}
					</h3>
					<div className={'text-white text-base'}>
						{props.collection.description}
					</div>
					<HoveringLink href={{
						pathname: '/collections/[collectionId]',
						params: { collectionId: props.collection.collection_id } as never
					}} label={t('view_collection')} />
				</div>
			</div>
			<div className={'px-[var(--container-padding)] py-6'}>
				<ProductsSection products={props.collection.products} />
			</div>
		</div>
	);
}