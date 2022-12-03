import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : '',
      clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : '',
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    // reconfigure response
    async session({ session, token, user }) {
      session.user!.firstName = session?.user?.name?.split(' ')[0]
      session.user!.id = token.sub;

      return session;
    }
  },
})