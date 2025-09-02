import { Collection } from '@/types/api.types';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface CollectionViewProps {
	collections: Collection[];
	image: string;
}

export function CollectionsView(props: CollectionViewProps) {
	const locale = useLocale() as LocaleType;
	return (
		<div
			className={`flex gap-9 pl-6 items-end py-9 `}>
			{
				props.collections.map((collection) => {
					const name = collection.title[locale];
					return (
						<Link key={collection.collection_id} href={{
							pathname: '/collections/[collectionId]',
							params: {
								collectionId: collection.collection_id
							}
						}}>
							<div className={'basis-[20%]'}>
								<div className={'font-medium text-xs uppercase pb-2'}>
									#Collection
								</div>
								<div className={'font-bold text-xs uppercase pb-2'}>
									{name}
								</div>
								<div className={'relative'}>
									<Image src={collection.images[0]} alt={name} width={300} height={500} />
								</div>
							</div>
						</Link>
					);
				})
			}
		</div>
	);
}
