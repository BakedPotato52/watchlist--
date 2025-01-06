import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { prisma } from './prisma'

async function getSession() {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('session')

    if (!sessionCookie) {
        return null
    }

    return decrypt(sessionCookie.value)
}

export async function getServerSideUser() {
    const session = await getSession()
    if (!session) {
        return null
    }

    // Assuming the session contains the user ID
    const userId = session.userId

    // Here you would typically fetch the user data from your database
    // For this example, we'll return a mock user object


    // In a real application, you might do something like this:
    const user = await prisma.user.findUnique({ where: { id: userId } })
    return user
}
