import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiResponse, NextApiRequest } from 'next-auth/_utils'
import dbConnect from '../../../libs/db/dbConnect'
import User from '../../../libs/models/User'
import { passwordCheck } from '../../../libs/password'

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        const { email, password } = credentials
        const user = await User.findOne({ email })

        if (user) {
          const isValid = await passwordCheck(password, user.password)

          if (isValid) {
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async redirect(url: string, baseUrl: string) {
      return baseUrl
    },

    async jwt(token, user) {
      const isSignIn = user ? true : false

      if (isSignIn) {
        token.id = user._id
      }

      return token
    },

    async session(session, token) {
      session.id = token.id
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options)

export default Auth
