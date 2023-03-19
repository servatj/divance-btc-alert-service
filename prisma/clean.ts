import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();


const deleteToken = async () => {
    await prisma.token_ath.deleteMany({where : { symbol: 'LUNA/USDT' }});
}


async function main() {
    if (!(process.env.NODE_ENV === 'test')) {
        console.log('Only seed on development');
        return;
    }
    console.log('seeding');
    await deleteToken();
}

(async function run(){
    try {
        console.log('Start Seed process')
        await main();
    } catch(error) {

        console.log(error);
    }
})()
