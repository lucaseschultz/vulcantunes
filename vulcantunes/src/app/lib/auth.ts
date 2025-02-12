import { NextAuthConfig } from 'next-auth'

export const authOptions = {
  providers: [],
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtectedRoute = nextUrl.pathname.startsWith('/account') ||
        nextUrl.pathname.startsWith('/admin')

      if (isProtectedRoute) {
        return isLoggedIn
      }
      return true
    }
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
} satisfies NextAuthConfig
