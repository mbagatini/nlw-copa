import Image from "next/image";
import checkImg from '../assets/check.svg';

interface CountInfoProps {
	title: string;
	count: number;
}

export function CountInfo({ title, count }: CountInfoProps) {
	return (
		<div className='flex gap-6'>
			<Image src={checkImg} alt="Check image" />
			<div className='text-white'>
				<strong className='text-2xl'>+{count}</strong>
				<p>{title}</p>
			</div>
		</div>
	)
}