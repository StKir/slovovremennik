import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.REACT_AUTH_CLIENT_ID!,
			clientSecret: process.env.AUTH_CLIENT_SECRET!
		})
	]
};
