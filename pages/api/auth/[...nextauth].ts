import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : '',
      clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : '',    
    //   state: false,
    }),
    // ...add more providers here
  ],
  // secret: process.env.SECRET,
  pages: {
      signIn: "/auth/signin",
  },
  callbacks: {
    // reconfigure response
    async session({ session, token, user }) {
      session.user!.username! = session?.user?.name?.split(' ').join('').toLocaleLowerCase();
      session.user!.uid! = token.sub;

      return session;
    }
  },
})