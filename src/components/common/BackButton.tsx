import { Button, IconButton } from '@mui/material';
import { ChevronLeft } from '@/components/icons/ChevronLeft';

interface Props {
	label?: string;
	onClick: () => void;
}

export function BackButton(props: Props) {
	return (
		<div className={'absolute top-[20px] left-4 md:relative md:top-0 md:left-0 z-1400'}>
			{props.label && <Button size={'small'} color={'primary'} variant={'contained'} onClick={props.onClick}
									sx={{
										background: 'white',
										fontSize: { xs: '10px', md: '12px' },
										color: 'var(--foreground)',
										fontWeight: '500',
										padding: { xs: '3px 6px', md: '4px 8px' },
										lineHeight: { xs: '10px', md: '12px' },
										borderRadius: '32px'
									}}
									startIcon={<ChevronLeft size={4} stroke={'var(--foreground)'} />}>
				{props.label}
			</Button>}
			{!props.label && (
				<IconButton color={'primary'} sx={{
					background: 'white',
					'hover:backgroundColor': 'white',
					color: 'var(--foreground)',
					padding: { xs: '3px 6px', md: '4px 8px' },
					borderRadius: '32px'
				}}>
					<ChevronLeft size={4} stroke={'var(--foreground)'} />
				</IconButton>
			)}
		</div>
	);
}