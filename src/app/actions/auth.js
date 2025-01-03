'use server'

import { signIn } from "@/app/api/auth/[...nextauth]/providers"

export async function handleSignIn(providerId, credentials) {
    if (providerId === "credentials" && credentials) {
        return signIn(providerId, {
            redirect: false,
            username: credentials.username,
            password: credentials.password
        })
    } else {
        return signIn(providerId, { redirect: false })
    }
}

