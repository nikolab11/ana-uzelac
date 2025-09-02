import { Collection } from '@/types/api.types';
import { useLocale } from 'next-intl';
import { LocaleType } from '@/types/routing';

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
					const name = collection[`name_${locale}`];
					return (
						<div className={'basis-[20%]'} key={collection.collection_id}>
							<div className={'font-medium text-xs uppercase pb-2'}>
								#Collection
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
	);
}
