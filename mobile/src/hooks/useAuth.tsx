import { createContext, ReactNode, useContext, useState } from "react";

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

	async function signIn() {
		// const response = await auth.signIn();

		// setUser(response.user);
	}

	function signOut() {
		setUser(null);
	}

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