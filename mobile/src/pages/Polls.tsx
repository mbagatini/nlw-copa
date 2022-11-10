import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Icon, useToast, VStack } from "native-base";
import React, { useCallback, useState } from "react";

import { Button } from "../components/Button";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCard, PoolPros } from "../components/PoolCard";
import { api } from "../services/api";
import { getToastMessage } from "../utils/useToast";

export function Polls() {
	const [polls, setPolls] = useState<PoolPros[]>([]);
	const { navigate } = useNavigation();
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();

	useFocusEffect(
		useCallback(() => {
			setIsLoading(true);

			api.get('/polls')
				.then(response => {
					setPolls(response.data);
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
		}, [])
	);

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title="Meus bolões" />

			<VStack p={7}>
				<VStack pb={4} mb={4} borderBottomWidth={1} borderBottomColor="gray.600">
					<Button
						leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
						onPress={() => navigate('find')}
					>
						BUSCAR BOLÃO POR CÓDIGO
					</Button>
				</VStack>

				{isLoading ? (
					<Loading />
				) : (
					<FlatList
						data={polls}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<PoolCard data={item} onPress={() => navigate('details', { id: item.id })} />
						)}
						ListEmptyComponent={<EmptyPoolList />}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ pb: 10 }}
					/>
				)}
			</VStack>
		</VStack>
	)
}