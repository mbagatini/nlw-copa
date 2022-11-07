import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Icon, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { api } from "../services/api";
import { toast } from "../hooks/useToast";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { PoolPros, PoolCard } from "../components/PoolCard";
import { Loading } from "../components/Loading";

export function Polls() {
	const [polls, setPolls] = useState<PoolPros[]>([]);
	const { navigate } = useNavigation();
	const [isLoading, setIsLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			setIsLoading(true);

			api.get('/polls')
				.then(response => {
					setPolls(response.data);
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
		}, [])
	);

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title="Meus bolões" />

			<VStack mt={6} mx={5} p={7} pb={4} mb={4} borderBottomWidth={1} borderBottomColor="gray.600">
				<Button
					leftIcon={<Icon as={Octicons} color="black" size="md" />}
					onPress={() => navigate('find')}
				>
					BUSCAR BOLÃO POR CÓDIGO
				</Button>

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