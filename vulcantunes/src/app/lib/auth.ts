import { NextAuthConfig } from 'next-auth'

export const authOptions: NextAuthConfig = {
  providers: [
    // Add your providers here
  ],
  pages: {
    signIn: '/account/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
