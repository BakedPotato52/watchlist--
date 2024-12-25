import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Add your credentials logic here
                // This is a placeholder implementation
                if (credentials.email === "user@example.com" && credentials.password === "password") {
                    return { id: "1", name: "J Smith", email: "jsmith@example.com" }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        },
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
}

