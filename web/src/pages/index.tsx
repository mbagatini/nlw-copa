import Head from 'next/head';
import Image from "next/image";
import { GetServerSideProps } from 'next';

import logoImg from '../assets/logo.svg';
import avatarsImg from '../assets/avatars.png';
import devicesImg from '../assets/devices.png';

import { api } from '../services/api';
import { CreationPoolForm } from '../components/CreationPoolForm';
import { CountInfo } from '../components/CountInfo';

interface HomeProps {
	usersCount: number;
	guessesCount: number;
	poolsCount: number;
}

export default function Home(props: HomeProps) {
	return (
		<>
			<Head>
				<title>nlw COPA</title>
			</Head>
			<main className='max-w-[1124px] h-screen grid grid-cols-2 gap-28 mx-auto items-center'>
				<div className='flex flex-col gap-10'>
					<Image src={logoImg} alt="nlw COPA" quality={100} className='mb-6' />

					<h1 className='text-white font-bold text-5xl'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

					<div className='flex items-center gap-2'>
						<Image src={avatarsImg} alt="Users avatars" quality={100} />
						<strong className='text-gray-100 text-xl'>
							<span className='text-green-300'>+{props.usersCount}</span> pessoas já estão usando
						</strong>
					</div>

					<CreationPoolForm />

					<div className='flex justify-between border-t border-gray-600 pt-10'>
						<CountInfo title='Bolões criados' count={props.poolsCount} />
						<div className='border-r border-gray-600' />
						<CountInfo title='Palpites enviados' count={props.guessesCount} />
					</div>
				</div>

				<Image src={devicesImg} alt="Preview app on device screen" quality={100} />
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const [usersResponse, guessesResponse, poolsResponse] = await Promise.all([
		api.get('/users/count'),
		api.get('/guesses/count'),
		api.get('/pools/count')
	]);

	return {
		props: {
			usersCount: usersResponse.data.count,
			guessesCount: guessesResponse.data.count,
			poolsCount: poolsResponse.data.count,
		}
	}
}
