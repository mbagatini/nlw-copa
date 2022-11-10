import React, { useState } from "react";
import { VStack, Text, Heading, useToast } from "native-base";

import LogoImg from "../assets/logo.svg";
import { api } from "../services/api";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { getToastMessage } from "../utils/useToast";

export function NewPoll() {
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const toast = useToast();

	async function handleAddPoll() {
		if (!title.trim()) {
			return toast.show(getToastMessage("Informe um nome para o bolão"));
		}

		setIsLoading(true);

		try {
			await api.post('/polls', { title });
			setTitle("");
			toast.show(getToastMessage("Bolão criado com sucesso"));
		} catch (error) {
			toast.show(getToastMessage("Ocorreu um problema ao criar o bolão"));
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title="Criar novo bolão" />

			<VStack mt={8} mx={5} alignItems="center" p={7}>
				<LogoImg />

				<Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
					Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
				</Heading>

				<Input placeholder="Qual o nome do seu bolão?" mb={2}
					onChangeText={setTitle}
					value={title}
				/>
				<Button onPress={handleAddPoll} isLoading={isLoading} _loading={{ _spinner: {} }}>
					CRIAR MEU BOLÃO
				</Button>

				<Text color="gray.300" fontSize="sm" textAlign="center" px={10} mt={6}>
					Após criar seu boção, você receberá um código único e poderá usar para convidar outras pessoas.
				</Text>
			</VStack>
		</VStack >
	)
}