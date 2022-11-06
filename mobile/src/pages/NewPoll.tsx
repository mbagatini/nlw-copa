import React from "react";
import { VStack, Text, Heading } from "native-base";

import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function NewPoll() {

	return (
		<VStack flex={1} bgColor="gray.900" p={7}>
			<Header title="Criar novo bolão" />

			<VStack mt={8} mx={5} alignItems="center">
				<LogoImg />

				<Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
					Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
				</Heading>

				<Input placeholder="Qual o nome do seu bolão?" mb={2} />
				<Button>CRIAR MEU BOLÃO</Button>

				<Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={6}>
					Após criar seu boção, você receberá um código único e poderá usar para convidar outras pessoas.
				</Text>
			</VStack>
		</VStack >
	)
}