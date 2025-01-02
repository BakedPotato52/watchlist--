import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET must be set")
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("GitHub OAuth credentials must be set")
}

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

export const { handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        secret: process.env.JWT_SECRET,
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
    },
    debug: process.env.NODE_ENV !== "production",
})

