import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
    request,
    { params }
) {
    try {
        const { action } = await request.json()
        const userId = 'user-id' // TODO: Get this from the authenticated user session

        if (action !== 'subscribe' && action !== 'unsubscribe') {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

        const channel = await prisma.user.findUnique({
            where: { id: params.id },
            include: { subscribers: true },
        })

        if (!channel) {
            return NextResponse.json({ error: 'Channel not found' }, { status: 404 })
        }

        let updatedChannel

        if (action === 'subscribe') {
            updatedChannel = await prisma.user.update({
                where: { id: params.id },
                data: {
                    subscribers: {
                        connect: { id: userId },
                    },
                },
                include: { subscribers: true },
            })
        } else {
            updatedChannel = await prisma.user.update({
                where: { id: params.id },
                data: {
                    subscribers: {
                        disconnect: { id: userId },
                    },
                },
                include: { subscribers: true },
            })
        }

        return NextResponse.json({ isSubscribed: updatedChannel.subscribers.some(sub => sub.id === userId) })
    } catch (error) {
        console.error('Error updating subscription:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

