import React, { useState } from "react";
import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import { useAuth } from '../hooks/useAuth';
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";

export function SignIn() {
	const { signIn } = useAuth();
	const [isSigningIn, setIsSigningIn] = useState(false);

	async function handleSignIn() {
		setIsSigningIn(true);
		await signIn();
		setIsSigningIn(false);
	}

	return (
		<Center flex={1} bgColor="gray.900" p={7}>
			<LogoImg width={212} height={40} />

			<Button color="red.600" titleColor="white" mt={12}
				leftIcon={<Icon as={Fontisto} color="white" size="md" name="google" />}
				onPress={handleSignIn}
				isLoading={isSigningIn}
				_loading={{ _spinner: { color: "white" } }}
			>
				ENTRAR COM GOOGLE
			</Button>

			<Text color="white" textAlign="center" mt={6}>
				Não utilizamos nenhuma informação além {'\n'}
				do seu e-mail para criação de sua conta.
			</Text>
		</Center >
	)
}