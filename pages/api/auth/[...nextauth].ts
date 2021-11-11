import NextAuth from "next-auth"
import { NextAuthRequest, NextAuthResponse } from "next-auth/internals"
import Providers from 'next-auth/providers'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async session(session: any, user: any, token: any) {
      const userFound = await prisma.user.findUnique({where: {email: user.email}})
      if(!userFound) {
        const newUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email
          },
        })
        session.accountId = newUser.id
      } else {
        session.accountId = userFound.id
      }
      await prisma.$disconnect
      return session
    },
  }
}

export default (req: NextAuthRequest, res: NextAuthResponse) => NextAuth(req, res, options)
