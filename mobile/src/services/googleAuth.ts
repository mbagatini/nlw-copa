import { makeRedirectUri } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';

import { api } from './api';

/**
 * Possibly completes an authentication session on web in a window popup. 
 * The method should be invoked on the page that the window redirects to.
 */
maybeCompleteAuthSession();

const uriRedirect = makeRedirectUri({ useProxy: true });

/**
 Check Authorized redirect URIs
 console.log(uriRedirect);
*/

export function getGoogleAuthRequest() {
	/**
	 * Setup the Google authorization request
	 */
	const [request, response, promptAsync] = useAuthRequest({
		clientId: process.env.CLIENT_ID,
		redirectUri: uriRedirect,
		scopes: ['profile', 'email']
	});

	return { request, response, promptAsync };
}

export async function signInWithGoogle(accessToken: string) {
	console.log("TOKEN =============> " + accessToken);

	const response = await api.post('/auth', {
		"access_token": accessToken
	});

	// JWT token
	const { token } = response.data;

	return { token };
}