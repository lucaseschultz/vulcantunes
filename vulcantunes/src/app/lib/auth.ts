import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/account/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  }
}
