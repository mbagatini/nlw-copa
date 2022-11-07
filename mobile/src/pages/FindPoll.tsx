import { Heading, VStack } from "native-base";
import React, { useState } from "react";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { toast } from "../hooks/useToast";
import { api } from "../services/api";

export function FindPoll() {
	const [pollCode, setPollCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleFindPoll() {
		try {
			setIsLoading(true);

			if (!pollCode.trim()) {
				return toast('Informe o código do bolão');
			}

			await api.post(`polls/${pollCode}/join`);

			toast('Agora você é um participante do bolão!');
		} catch (error) {
			if (error.response?.data?.message) {
				return toast(error.response.data.message);
			}

			toast('Ocorreu um problema ao buscar o bolão');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title="Buscar por código" />

			<VStack mt={8} mx={5} alignItems="center" p={7}>
				<Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
					Encontre um bolão através de {'\n'} seu código único
				</Heading>

				<Input placeholder="Qual o código do bolão?" mb={2} autoCapitalize="characters"
					value={pollCode}
					onChangeText={setPollCode}
				/>
				<Button
					onPress={handleFindPoll}
					isLoading={isLoading}
					_loading={{ _spinner: {} }}
				>
					BUSCAR E PARTICIPAR DO BOLÃO
				</Button>
			</VStack>
		</VStack>
	)
}