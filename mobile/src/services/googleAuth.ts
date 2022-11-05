import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';

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
	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: '637785802951-1k5ifcie921mjgj3teqemad6dklcd1ji.apps.googleusercontent.com',
		redirectUri: uriRedirect,
		scopes: ['profile', 'email']
	});

	return { request, response, promptAsync };
}

export async function signInWithGoogle(accessToken: string) {
	console.log(accessToken)
}