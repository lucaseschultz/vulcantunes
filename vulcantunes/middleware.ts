import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  () => NextResponse.next(),
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isLoggedIn = !!token
        const isProtectedRoute = req.nextUrl.pathname.startsWith('/account') ||
          req.nextUrl.pathname.startsWith('/admin')

        if (isProtectedRoute) {
          return isLoggedIn
        }
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/account/:path*', '/admin/:path*']
}
