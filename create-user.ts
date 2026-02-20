
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'teacher@test.com' },
        update: {},
        create: {
            email: 'teacher@test.com',
            name: 'Test Teacher',
            password: hashedPassword,
            role: 'TEACHER'
        }
    });
    console.log('User created:', user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
