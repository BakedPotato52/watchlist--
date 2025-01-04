import { getServerSession } from "next-auth/next"
import { nextAuthHandlers } from '@app/api/auth/[...nextauth]/providers'

export async function getSession() {
    return await getServerSession(nextAuthHandlers)
}

export async function getCurrentUser() {
    const session = await getSession()
    return session?.user
}

