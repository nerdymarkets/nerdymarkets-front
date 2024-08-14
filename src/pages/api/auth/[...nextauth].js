import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/pages/api/auth';
import { secretKey } from '@/environments/environment';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const user = await login(credentials.email, credentials.password);
          if (user && user.access_token) {
            return {
              ...user,
              accessToken: user.access_token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    jwt: true,
    maxAge: 2 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.dateOfBirth = user.dateOfBirth;
        token.isVerified = user.isVerified;
        token.paypalsubscriptions = user.paypalsubscriptions;
        token.stripeSubscriptions = user.stripeSubscriptions;
        token.expires = Date.now() + 2 * 60 * 60 * 1000;
      }
      if (Date.now() > token.expires) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (Date.now() > token.expires) {
        return null;
      }
      session.accessToken = token.accessToken;
      session.user = {
        email: token.email,
        firstname: token.firstname,
        lastname: token.lastname,
        dateOfBirth: token.dateOfBirth,
        isVerified: token.isVerified,
        paypalsubscriptions: token.paypalsubscriptions,
        stripeSubscriptions: token.stripeSubscriptions,
      };

      return session;
    },
  },
  secret: secretKey,
});
