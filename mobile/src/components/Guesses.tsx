import { FlatList, useToast } from 'native-base';
import React, { useCallback, useEffect, useState } from "react";

import { api } from "../services/api";
import { getToastMessage } from "../utils/useToast";
import { EmptyMyPoolList } from "./EmptyMyPoolList";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";

interface Props {
	poolId: string;
	code: string;
}

export function Guesses({ poolId, code }: Props) {
	const [games, setGames] = useState<GameProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [firstTeamPoints, setFirstTeamPoints] = useState('');
	const [secondTeamPoints, setSecondTeamPoints] = useState('');

	const toast = useToast();

	async function handleAddGuess(gameId: string) {
		if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
			return toast.show(getToastMessage('Informe o placar para o jogo'))
		}

		try {
			await api.post(`/polls/${poolId}/games/${gameId}/guess`, {
				firstTeamPoints: Number(firstTeamPoints),
				secondTeamPoints: Number(secondTeamPoints)
			});

			toast.show(getToastMessage("Palpite criado com sucesso"));

			fetchGames();
		} catch (error) {
			if (error.response?.data?.message) {
				return toast.show(getToastMessage(error.response.data.message));
			}

			toast.show(getToastMessage("Não foi possível criar o palpite"));
		}
	}

	const fetchGames = useCallback(async () => {
		setIsLoading(true);

		api.get(`/polls/${poolId}/games`)
			.then(response => {
				const games = response.data.games.map(game => {
					return {
						...game,
						date: Date.parse(game.date)
					}
				});

				setGames(games);
			})
			.catch(error => {
				if (error.response?.data?.message) {
					return toast.show(getToastMessage(error.response.data.message));
				}

				toast.show(getToastMessage("Não foi possível obter seus bolões"));
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, []);

	useEffect(() => {
		fetchGames();
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
			ListEmptyComponent={<EmptyMyPoolList code={code} />}
			_contentContainerStyle={{ pb: 10 }}
		/>
	);
}
