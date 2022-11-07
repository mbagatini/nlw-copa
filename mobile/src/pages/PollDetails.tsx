import { useRoute } from "@react-navigation/native";
import { HStack, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { toast } from "../hooks/useToast";
import { api } from "../services/api";

export function PollDetails() {
	const [poll, setPoll] = useState<PoolPros>({} as PoolPros);
	const [isLoading, setIsLoading] = useState(false);
	const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');

	const route = useRoute();
	const { id } = route.params as { id: string }

	useEffect(() => {
		setIsLoading(true);

		api.get(`/polls/${id}`)
			.then(response => {
				setPoll(response.data.poll);
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
	}, [id])

	if (isLoading) {
		return <Loading />;
	}

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title={poll.title} showBackButton showShareButton />

			{poll._count?.participants == 0 ? (
				<EmptyMyPoolList code={poll.code} />
			) : (
				<VStack mt={8} mx={5} alignItems="center" p={7}>
					<PoolHeader data={poll} />

					<HStack>
						<Option title="Seus palpites"
							isSelected={optionSelected == 'guesses'}
							onPress={() => setOptionSelected('guesses')}
						/>
						<Option title="Ranking do grupo"
							isSelected={optionSelected == 'ranking'}
							onPress={() => setOptionSelected('ranking')}
						/>
					</HStack>
				</VStack>
			)}
		</VStack>
	)

}