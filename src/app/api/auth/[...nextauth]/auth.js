import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Example authorization logic: Replace with your own logic.
                const user = await prisma.user.findFirst({
                    where: { username: credentials.username },
                });

                if (user && user.password === credentials.password) {
                    // You can also hash and compare passwords here.
                    return user;
                }

                return null; // Return null if user is not authenticated.
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async session({ session, user }) {
            session.user = user;
            return session;
        },
    },
    events: {
        async signIn(message) {
            console.log("Signed in!", { message });
        },
        async signOut(message) {
            console.log("Signed out!", { message });
        },
        async createUser(message) {
            console.log("User created!", { message });
        },
    },
};

export default options;
