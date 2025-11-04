import { Collection } from '@/types/api.types';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface CollectionViewProps {
	collections: Collection[];
	image: string;
	isDrawer?: boolean;
}

export function CollectionsView(props: CollectionViewProps) {
	const locale = useLocale() as LocaleType;
	const isDrawer = props.isDrawer;
	return (
		<div
			className={`flex ${isDrawer ? 'flex-col' : ''} gap-9 ${isDrawer ? 'px-0' : 'px-6'} ${isDrawer ? 'items-start' : 'items-end'} py-9 overflow-y-auto`}>
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
							<div className={`${isDrawer ? 'w-full' : 'basis-[20%]'}`}>
								<div className={'font-medium text-xs uppercase pb-2'}>
									#Collection
								</div>
								<div className={'font-bold text-xs uppercase pb-2'}>
									{name}
								</div>
								<div className={'relative'}>
									<Image 
										src={collection.images[0]} 
										alt={name} 
										width={isDrawer ? 200 : 300} 
										height={isDrawer ? 333 : 500}
										className={isDrawer ? 'w-full h-auto' : ''}
									/>
								</div>
							</div>
						</Link>
					);
				})
			}
		</div>
	);
}
