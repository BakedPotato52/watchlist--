import { PrismaClient } from '@prisma/client'
import { currentUser } from './extensions/currentUser';

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient().$extends(currentUser());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma