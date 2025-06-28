import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// export your NextAuth config
export const authOptions = {
  // 1) Tell NextAuth you want a credentials-based login flow:
  providers: [
    CredentialsProvider({
      name: 'username / password',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      // 2) This `authorize()` runs when someone calls `signIn('credentials', …)`
      async authorize(credentials) {
        // Call your Express API:
        const res = await fetch('http://localhost:9000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',           // pass through the cookie
          body: JSON.stringify(credentials)
        });

        // If Express returned 200 + a user object, extract it:
        if (res.ok) {
          const { user } = await res.json();
          // MUST return an object. NextAuth will store this in the session.
          return { id: user.id, name: user.name, role: user.role };
        }
        // On any other status, return null → signIn fails
        return null;
      }
    })
  ],

  // 3) Session options: you don’t have to worry about JWT—NextAuth does it for you.
  session: {
    strategy: 'jwt',      // uses a JWT under the hood, but you never touch it
    maxAge: 24 * 60 * 60  // 1 day
  },

  // 4) Optional callbacks to shape the session object exposed to your front-end:
//   callbacks: {
//     async jwt({ token, user }) {
//       // After authorize(), `user` is what you returned above.
//       if (user) token.user = user;
//       return token;
//     },
//     async session({ session, token }) {
//       // Makes `session.user` available in `useSession()`
//       session.user = token.user as any;
//       return session;
//     }
//   },

  // 5) Secure defaults: HTTP-only cookies, CSRF protection, etc.
  pages: {
    signIn: '/api/auth/login',     // your custom login page (optional)
  }
};

export default NextAuth(authOptions);
