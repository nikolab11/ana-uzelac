import Link from 'next/link';

interface Props {
	title: string;
	items: { path: string, name: string }[];
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
								  href={item.path}>{item.name}</Link>
						</div>
					);
				})
			}
		</div>
	);
}