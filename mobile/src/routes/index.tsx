import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AppRoutes from './app.routes';
import { useAuth } from '../hooks/useAuth';
import { SignIn } from '../pages/SignIn';

export default function Routes() {
	const { isUserSigned } = useAuth();

	return (
		<NavigationContainer>
			{isUserSigned ? <AppRoutes /> : <SignIn />}
		</NavigationContainer>
	);
}