import { createContext, useContext, useEffect, useState } from "react";

import { getGoogleAuthRequest, signInWithGoogle } from '../services/googleAuth';

interface User {
	name: string;
	email: string;
}

interface AuthContextData {
	signed: boolean;
	user: User | null;
	signIn(): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider({ children }) {
	const [user, setUser] = useState<User | null>(null);

	const { response, promptAsync } = getGoogleAuthRequest();

	async function signIn() {
		try {
			await promptAsync();
			// const response = await auth.signIn();
			// setUser(response.user);
		} catch (error) {

		}
	}

	function signOut() {
		setUser(null);
	}

	useEffect(() => {
		if (response && response.type === 'success' && response.authentication?.accessToken) {
			signInWithGoogle(response.authentication.accessToken);
		}
	}, [response])

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);
	return context;
}