import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to DB...');
        const count = await prisma.user.count();
        console.log('User count:', count);
    } catch (e) {
        console.error('Error in test:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
