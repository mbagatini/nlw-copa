import Head from 'next/head';

import Image from "next/image";

import logoImg from '../assets/logo.svg';
import checkImg from '../assets/check.svg';
import avatarsImg from '../assets/avatars.png';
import devicesImg from '../assets/devices.png';

export default function Home() {
	return (
		<div>
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
							<span className='text-green-300'>+12.487</span> pessoas já estão usando
						</strong>
					</div>

					<div>
						<form className='flex gap-2 text-sm'>
							<input
								type="text"
								placeholder='Qual o nome do seu bolão?'
								className='flex-1 px-6 py-4 rounded bg-gray-700 border border-gray-600 text-white [&[data-placeholder]]:text-gray-200'
							/>
							<button type='submit' className='px-6 py-4 rounded bg-yellow-500 font-bold text-gray-950 uppercase hover:brightness-90'>
								Criar meu bolão
							</button>
						</form>

						<p className='text-sm text-gray-400 mt-4 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
					</div>

					<div className='flex justify-between border-t border-gray-600 pt-10'>
						<div className='flex gap-6'>
							<Image src={checkImg} alt="Check image" />
							<div className='text-white'>
								<strong className='text-2xl'>+398</strong>
								<p>Bolões criados</p>
							</div>
						</div>

						<div className='border-r border-gray-600' />

						<div className='flex gap-6'>
							<Image src={checkImg} alt="Check image" />
							<div className='text-white'>
								<strong className='text-2xl'>+1.900</strong>
								<p>Palpites enviados</p>
							</div>
						</div>
					</div>
				</div>

				<Image src={devicesImg} alt="Preview app on device screen" quality={100} />
			</main>
		</div>
	)
}
