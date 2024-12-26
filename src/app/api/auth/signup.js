import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(201).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'User creation failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}