// import { prisma } from './prisma'

// export async function getUserData(userId) {
//     console.log(prisma)

//     try {
//         const users = await prisma.user.findMany({
//             where: {
//                 id: userId
//             },
//             select: {
//                 id: true,
//                 username: true,
//                 email: true,
//                 avatarUrl: true,
//                 videos: {
//                     select: {
//                         id: true,
//                         url: true,
//                         title: true,
//                         description: true,
//                         likes: true,
//                         views: true,
//                         updatedAt: true
//                     }
//                 }

//             }
//         })

//         if (!users) {
//             throw new Error('User not found')
//         }

//         return users
//     } catch (error) {
//         console.error('Failed to fetch user data:', error)
//         throw error
//     }
// }

