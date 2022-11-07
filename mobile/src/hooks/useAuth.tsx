import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

import { getGoogleAuthRequest, signInWithGoogle } from '../services/googleAuth';

interface User {
	name: string;
	avatarUrl: string;
}

interface AuthContextData {
	isUserSigned: boolean;
	user: User | null;
	signIn(): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider({ children }) {
	const [user, setUser] = useState<User | null>(null);

	const { response, promptAsync } = getGoogleAuthRequest();

	async function signIn() {
		await promptAsync({ useProxy: true });
	}

	function setUserInfo() {
		api.get('/me').then(userResponse => {
			setUser({ ...userResponse.data.user });
		})
	}

	async function handleJWTHeader() {
		try {
			if (response && response.type === 'success' && response.authentication?.accessToken) {
				const { token } = await signInWithGoogle(response.authentication.accessToken);

				// set authorization for all future request
				api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

				setUserInfo();
			}
		} catch (error) {
			console.error(error);
		}
	}

	function signOut() {
		setUser(null);
	}

	useEffect(() => {
		handleJWTHeader();
	}, [response])

	return (
		<AuthContext.Provider
			value={{ isUserSigned: !!user, user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);
	return context;
}