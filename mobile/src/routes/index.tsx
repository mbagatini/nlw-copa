import { NavigationContainer } from '@react-navigation/native';
import { Box } from 'native-base';
import React from 'react';

import AppRoutes from './app.routes';
import { useAuth } from '../hooks/useAuth';
import { SignIn } from '../pages/SignIn';

export default function Routes() {
	const { isUserSigned } = useAuth();

	return (
		<Box flex={1} bg="gray.900">
			<NavigationContainer>
				{isUserSigned ? <AppRoutes /> : <SignIn />}
			</NavigationContainer>
		</Box>
	);
}