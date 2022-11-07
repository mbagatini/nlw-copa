import React, { useEffect, useState } from "react";
import { Box, FlatList } from 'native-base';

import { api } from "../services/api";
import { Game, GameProps } from "./Game";
import { toast } from "../hooks/useToast";
import { Loading } from "./Loading";

interface Props {
	poolId: string;
}

export function Guesses({ poolId }: Props) {
	const [games, setGames] = useState<GameProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [firstTeamPoints, setFirstTeamPoints] = useState('');
	const [secondTeamPoints, setSecondTeamPoints] = useState('');

	async function handleAddGuess(gameId: string) {
		if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
			return toast('Informe o placar para o jogo')
		}

		try {
			await api.post(`/polls/${poolId}/games/${gameId}`, {
				firstTeamPoints: Number(firstTeamPoints),
				secondTeamPoints: Number(secondTeamPoints)
			});

			toast("Palpite criado com sucesso");
		} catch (error) {
			if (error.response?.data?.message) {
				return toast(error.response.data.message);
			}

			toast("Não foi possível criar o palpite");
		}
	}

	useEffect(() => {
		setIsLoading(true);

		api.get(`/polls/${poolId}/games`)
			.then(response => {
				setGames(response.data.games);
			})
			.catch(error => {
				if (error.response?.data?.message) {
					return toast(error.response.data.message);
				}

				toast("Não foi possível obter seus bolões");
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, [poolId])

	if (isLoading) {
		return <Loading />;
	}

	return (
		<FlatList
			data={games}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<Game
					data={item}
					setFirstTeamPoints={setFirstTeamPoints}
					setSecondTeamPoints={setSecondTeamPoints}
					onGuessConfirm={() => handleAddGuess(item.id)}
				/>
			)}
			_contentContainerStyle={{ pb: 10 }}
		/>
	);
}
