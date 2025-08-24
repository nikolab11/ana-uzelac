import { Link } from '@/i18n/navigation';
import { BasePath, DynamicPath } from '@/types/routing';

interface Props {
	title: string;
	items: ({ path: BasePath, name: string, type: 'base' } | {
		path: DynamicPath,
		name: string,
		params: Record<string, string | number>,
		type: 'dynamic'
	})[];
}

export function FooterList(props: Props) {

	return (
		<div>
			<div className={'font-bold text-sm text-[#484848] pb-5'}>
				{props.title}
			</div>
			{
				props.items.map((item) => {
					return (
						<div className='pb-1.5' key={item.name}>
							<Link className={'font-normal text-sm text-[#484848]'}
								  href={item.type === 'base' ? item.path : {
									  pathname: item.path,
									  params: item.params
								  } as never}>{item.name}</Link>
						</div>
					);
				})
			}
		</div>
	);
}