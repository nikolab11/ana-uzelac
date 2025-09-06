import { Button, IconButton } from '@mui/material';
import { ChevronLeft } from '@/components/icons/ChevronLeft';

interface Props {
	label?: string;
	onClick: () => void;
}

export function BackButton(props: Props) {
	return (
		<div className={'absolute top-[40px] z-1400 left-[80px]'}>
			{props.label && <Button size={'small'} color={'primary'} variant={'contained'} onClick={props.onClick}
									sx={{
										background: 'white',
										fontSize: '12px',
										color: 'var(--foreground)',
										fontWeight: '500',
										padding: '4px 8px',
										lineHeight: '12px',
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
					padding: '4px 8px',
					borderRadius: '32px'
				}}>
					<ChevronLeft size={4} stroke={'var(--foreground)'} />
				</IconButton>
			)}
		</div>
	);
}