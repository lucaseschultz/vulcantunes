import { NextAuthConfig } from 'next-auth'

export const authOptions = {
  providers: [],
  pages: {
    signIn: '/account/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

