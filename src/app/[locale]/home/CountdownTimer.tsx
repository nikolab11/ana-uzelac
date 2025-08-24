'use client';

import { useEffect, useState } from 'react';
import { interval, intervalToDuration, parseISO } from 'date-fns';

interface Props {
	labels: string[];
}

const targetDate = parseISO('2025-12-03');

export function CountdownTimer(props: Props) {
	const [difference, setDifference] = useState([0, 0, 0, 0] as [number, number, number, number]);

	useEffect(() => {

		const int = setInterval(() => {
			const now = new Date();
			const duration = intervalToDuration(interval(now, targetDate));
			setDifference([duration.days || 0, duration.hours || 0, duration.minutes || 0, duration.seconds || 0] as const);
		}, 1000);
		return () => {
			clearInterval(int);
		};
	}, []);

	return (
		<div className='flex justify-between gap-4 pt-5'>
			{difference.map((value, index) => {
				return (
					<div key={index}>
						<div
							className={'p-5 mb-3 bg-white flex justify-center items-center text-[#DBAC50] font-medium text-2xl'}>
							{value}
						</div>
						<div className={'text-center text-[#444444]'}>{props.labels[index]}</div>
					</div>
				);
			})}
		</div>
	);
}