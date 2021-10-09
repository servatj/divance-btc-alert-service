import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

const seedUsers = async () => {
    console.log('Seeding users');
    await prisma.user.deleteMany();

    try {
        const users = new Array(100);
        console.log(users.length);

        for(let user of users) {
            await prisma.user.create({
                data: {
                    email: faker.internet.email(),
                    firstName: faker.name.findName(),
                    lastName: faker.name.findName(),
                    password: faker.internet.password(),
                    createdAt: faker.date.past(),
                    updatedAt: faker.date.recent()
                }
            })
        }
    } catch(error) {
        console.log('error seeding users')
    }
}

async function main() {
    if (!(process.env.NODE_ENV === 'test')) {
        console.log('Only seed on development');
        return;
    }
    console.log('seeding');
    await seedUsers();
}


(async function run(){
    try {
        console.log('Start Seed process')
        await main();
    } catch(error) {

        console.log(error);
    }
})()