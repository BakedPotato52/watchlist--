import NextAuth from "next-auth"
import { authConfig } from "./auth.config.js"

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

