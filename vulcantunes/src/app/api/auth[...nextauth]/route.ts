import NextAuth from 'next-auth'
import { authOptions } from '@/src/app/lib/auth'

const handler = NextAuth(authOptions)

export function GET() {
  return Response.json(handler)
}

export function POST() {
  return Response.json(handler)
}
