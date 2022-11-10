import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Share } from "react-native";

import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Ranking } from "../components/Ranking";
import { api } from "../services/api";
import { getToastMessage } from "../utils/useToast";

export function PollDetails() {
	const [poll, setPoll] = useState<PoolPros>({} as PoolPros);
	const [isLoading, setIsLoading] = useState(false);
	const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

	const toast = useToast();

	const route = useRoute();
	const { id } = route.params as { id: string }

	async function handlePollCodeShare() {
		await Share.share({
			message: poll.code
		});
	}

	useEffect(() => {
		setIsLoading(true);

		api.get(`/polls/${id}`)
			.then(response => {
				setPoll(response.data.poll);
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
	}, [id])

	if (isLoading) {
		return <Loading />;
	}

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title={poll.title} showBackButton showShareButton onShare={handlePollCodeShare} />

			<VStack alignItems="center" px={7}>
				<PoolHeader data={poll} />

				{poll._count?.participants == 0 ? (
					<EmptyMyPoolList code={poll.code} />
				) : (
					<VStack>
						<HStack width="100%" rounded="sm" mb={8} bgColor="gray.800">
							<Option title="Seus palpites"
								isSelected={optionSelected == 'guesses'}
								onPress={() => setOptionSelected('guesses')}
							/>
							<Option title="Ranking do grupo"
								isSelected={optionSelected == 'ranking'}
								onPress={() => setOptionSelected('ranking')}
							/>
						</HStack>

						{optionSelected == 'guesses' ? (
							<Guesses poolId={poll.id} code={poll.code} />
						) : (
							<Ranking />
						)}

					</VStack>
				)}
			</VStack>
		</VStack>
	)

}