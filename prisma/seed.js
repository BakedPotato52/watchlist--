import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
    // Clean the database
    await prisma.$transaction([
        prisma.notification.deleteMany(),
        prisma.report.deleteMany(),
        prisma.videoTag.deleteMany(),
        prisma.tag.deleteMany(),
        prisma.playlistItem.deleteMany(),
        prisma.playlist.deleteMany(),
        prisma.comment.deleteMany(),
        prisma.view.deleteMany(),
        prisma.like.deleteMany(),
        prisma.subscription.deleteMany(),
        prisma.video.deleteMany(),
        prisma.category.deleteMany(),
        prisma.user.deleteMany(),
    ]);

    // Create categories
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Music' } }),
        prisma.category.create({ data: { name: 'Gaming' } }),
        prisma.category.create({ data: { name: 'Education' } }),
        prisma.category.create({ data: { name: 'Entertainment' } }),
    ]);

    // Create tags
    const tags = await Promise.all([
        prisma.tag.create({ data: { name: 'javascript' } }),
        prisma.tag.create({ data: { name: 'react' } }),
        prisma.tag.create({ data: { name: 'nextjs' } }),
        prisma.tag.create({ data: { name: 'tutorial' } }),
    ]);

    // Create users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                username: 'johndoe',
                email: 'john@example.com',
                password: 'hashed_password_1', // In real app, ensure passwords are properly hashed
            },
        }),
        prisma.user.create({
            data: {
                username: 'janesmith',
                email: 'jane@example.com',
                password: 'hashed_password_2',
            },
        }),
        prisma.user.create({
            data: {
                username: 'bobwilson',
                email: 'bob@example.com',
                password: 'hashed_password_3',
            },
        }),
    ]);

    // Create subscriptions
    await prisma.subscription.create({
        data: {
            subscriberId: users[0].id,
            creatorId: users[1].id,
        },
    });

    // Create videos
    const videos = await Promise.all([
        prisma.video.create({
            data: {
                title: 'Getting Started with Next.js',
                description: 'Learn the basics of Next.js framework',
                url: 'https://example.com/video1.mp4',
                thumbnailUrl: 'https://example.com/thumbnail1.jpg',
                duration: 600, // 10 minutes
                visibility: 'PUBLIC',
                userId: users[0].id,
                categoryId: categories[2].id, // Education
                tags: {
                    create: [
                        { tag: { connect: { id: tags[0].id } } }, // javascript
                        { tag: { connect: { id: tags[2].id } } }, // nextjs
                    ],
                },
            },
        }),
        prisma.video.create({
            data: {
                title: 'React Hooks Tutorial',
                description: 'Understanding React Hooks in depth',
                url: 'https://example.com/video2.mp4',
                thumbnailUrl: 'https://example.com/thumbnail2.jpg',
                duration: 900, // 15 minutes
                visibility: 'PUBLIC',
                userId: users[1].id,
                categoryId: categories[2].id, // Education
                tags: {
                    create: [
                        { tag: { connect: { id: tags[1].id } } }, // react
                        { tag: { connect: { id: tags[3].id } } }, // tutorial
                    ],
                },
            },
        }),
    ]);

    // Create likes
    await Promise.all([
        prisma.like.create({
            data: {
                userId: users[1].id,
                videoId: videos[0].id,
            },
        }),
        prisma.like.create({
            data: {
                userId: users[2].id,
                videoId: videos[0].id,
            },
        }),
    ]);

    // Create views
    await Promise.all([
        prisma.view.create({
            data: {
                userId: users[1].id,
                videoId: videos[0].id,
            },
        }),
        prisma.view.create({
            data: {
                userId: users[2].id,
                videoId: videos[0].id,
            },
        }),
    ]);

    // Create comments
    const parentComment = await prisma.comment.create({
        data: {
            content: 'Great tutorial! Very helpful.',
            userId: users[1].id,
            videoId: videos[0].id,
        },
    });

    await prisma.comment.create({
        data: {
            content: 'Thanks! Glad you found it useful.',
            userId: users[0].id,
            videoId: videos[0].id,
            parentCommentId: parentComment.id,
        },
    });

    // Create playlist
    const playlist = await prisma.playlist.create({
        data: {
            title: 'Web Development Tutorials',
            description: 'A collection of helpful web development tutorials',
            visibility: 'PUBLIC',
            userId: users[0].id,
        },
    });

    // Add videos to playlist
    await Promise.all([
        prisma.playlistItem.create({
            data: {
                playlistId: playlist.id,
                videoId: videos[0].id,
                order: 1,
            },
        }),
        prisma.playlistItem.create({
            data: {
                playlistId: playlist.id,
                videoId: videos[1].id,
                order: 2,
            },
        }),
    ]);

    // Create notifications
    await prisma.notification.create({
        data: {
            content: 'New comment on your video',
            userId: users[0].id,
        },
    });

    // Create report
    await prisma.report.create({
        data: {
            reason: 'Inappropriate content',
            status: 'PENDING',
            reporterId: users[2].id,
            videoId: videos[1].id,
        },
    });

    console.log('Database has been seeded! 🌱');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

