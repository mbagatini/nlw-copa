import React from "react";
import { Icon, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function Polls() {
	const { navigate } = useNavigation();

	return (
		<VStack flex={1} bgColor="gray.900" p={7}>
			<Header title="Meus bolões" />

			<VStack mt={6} mx={5} pb={4} mb={4} borderBottomWidth={1} borderBottomColor="gray.600">
				<Button
					leftIcon={<Icon as={Octicons} color="black" size="md" />}
					onPress={() => navigate('find')}
				>
					BUSCAR BOLÃO POR CÓDIGO
				</Button>
			</VStack>
		</VStack>
	)
}