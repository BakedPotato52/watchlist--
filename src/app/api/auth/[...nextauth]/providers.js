import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

// Remove this check as Next.js will throw its own error if the env var is missing
// if (!process.env.NEXTAUTH_SECRET) {
//     throw new Error("NEXTAUTH_SECRET must be set")
// }

// if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
//     throw new Error("GitHub OAuth credentials must be set")
// }

const providers = [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.username || !credentials?.password) {
                return null
            }

            const user = await prisma.user.findUnique({
                where: { username: credentials.username }
            })

            if (!user || !user.password) {
                return null
            }

            const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

            if (!isPasswordValid) {
                return null
            }

            return {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        }
    })
]

export const providerMap = providers.map((provider) => ({
    id: provider.id,
    name: provider.name
}));

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
                maxAge: 30 * 24 * 60 * 60 // 30 days
            }
        },
        callbackUrl: {
            name: `__Secure-next-auth.callback-url`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `__Host-next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.username = token.username
            }
            return session
        }
    },
    pages: {
        signIn: '/signin',
        error: '/error',
        signOut: '/signout',
    },
}

const nextAuthHandlers = NextAuth(authOptions)

export const { handlers, signIn, signOut } = nextAuthHandlers

export { nextAuthHandlers as default }

