import { Collection } from '@/types/api.types';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ProductsSection } from '@/app/[locale]/ProductsSection';
import { HoveringLink } from '@/components/common/HoveringLink';

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
	const locale = useLocale() as 'eng' | 'fr';
	const t = useTranslations();
	const name = props.collection[`name_${locale}`];
	return (
		<div>
			<div key={props.collection.collection_id} className='relative h-[70vh]'>
				<Image fill src={props.collection.images[0]} alt={name} objectFit='cover' />
				<div className='absolute w-full h-full flex justify-center gap-5 flex-col pl-[98px]'>
					<h3 className={'text-white font-bold text-7xl'}>
						{name}
					</h3>
					<div className={'text-white text-base'}>
						{props.collection.description}
					</div>
					<HoveringLink href={`collections/${props.collection.collection_id}`} label={t('view_collection')} />
				</div>
			</div>
			<ProductsSection products={props.collection.products} />
		</div>
	);
}