import { FormEvent, useState } from "react";
import { api } from "../services/api";

export function CreationPoolForm() {
	const [title, setTitle] = useState("");
	const [code, setCode] = useState("");

	function handleCreatePool(e: FormEvent) {
		e.preventDefault();

		api.post('/pools', { title })
			.then((res) => {
				setCode(res.data.code);
				alert("Bolão criado com sucesso! Compartilhe o código " + res.data.code);
			})
			.catch(() => {
				alert("Houve um erro ao criar o bolão")
			})
	}

	return (
		<div>
			<form onSubmit={handleCreatePool} className='flex gap-2 text-sm'>
				<input
					type="text"
					placeholder='Qual o nome do seu bolão?'
					onChange={e => setTitle(e.target.value)}
					className='flex-1 px-6 py-4 rounded bg-gray-700 border border-gray-600 text-white [&[data-placeholder]]:text-gray-200'
				/>
				<button type='submit' className='px-6 py-4 rounded bg-yellow-500 font-bold text-gray-950 uppercase hover:brightness-90'>
					Criar meu bolão
				</button>
			</form>

			<p className='text-sm text-gray-400 mt-4 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

			{code && (
				<p className="text-white font-bold mt-4">O código do seu bolão é: <span className="text-yellow-500">{code}</span></p>
			)}
		</div>
	)
}