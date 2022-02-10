import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

const seedTokens = async () => {
    await prisma.token_ath.create({ data: { price_date: new Date('2021-11-10 10:31:02.643'), symbol: 'BTC/USDT',  high: 69000, symbolId: 1 }});
    await prisma.token_ath.create({ data: { price_date: new Date('2021-12-27 01:48:04.569'), symbol: 'LUNA/USDT', high: 103.6, symbolId: 2 }});
    await prisma.token_ath.create({ data: { price_date: new Date('2021-09-05 01:36:01.677'), symbol: 'ZIG/USDT',  high: 0.2129, symbolId: 3 }});
    await prisma.token_ath.create({ data: { price_date: new Date('2021-11-10 00:03:02.079'), symbol: 'ETH/USDT',  high: 4.868, symbolId: 4 }});
    await prisma.token_ath.create({ data: { price_date: new Date('2021-12-22 20:57:04.598'), symbol: 'SOL/USDT',  high: 260.06, symbolId: 5 }});
    await prisma.token_ath.create({ data: { price_date: new Date('2021-09-20 00:00:00.000'), symbol: 'ATOM/USDT', high: 44.7, symbolId: 6 }});
}

const seedInfo = async () => {
    await prisma.token_info.create({ data: { symbol: 'BTC/USDT', logo_url: 'bitcoin', pair: 'bitcoin', networks: 'bitcoin', totalSupply: 210000000, fixedSupply: true , api: 'binance', token_exchange_query: 'BTCUSD'}});
    await prisma.token_info.create({ data: { symbol: 'LUNA/USDT', logo_url: 'terra-luna', pair: 'terra-luna', networks: 'luna', totalSupply: 800000000, fixedSupply: false, api: 'binance', token_exchange_query: 'BTCUSD' }});
    await prisma.token_info.create({ data: { symbol: 'ZIG/USDT', logo_url: 'zignaly', pair: 'zignaly', networks: 'zignaly', totalSupply: 2000000000, fixedSupply: true , api: 'binance', token_exchange_query: 'BTCUSD'}});
    await prisma.token_info.create({ data: { symbol: 'ETH/USDT', logo_url: 'ethereum', pair: 'ethereum', networks: 'ethereum, ', totalSupply: 1910000000, fixedSupply: false, api: 'binance', token_exchange_query: 'BTCUSD' }});
    await prisma.token_info.create({ data: { symbol: 'SOL/USDT', logo_url: 'solana', pair: 'solana', networks: 'solana', totalSupply: 314000000, fixedSupply: false, api: 'binance', token_exchange_query: 'BTCUSD' }});
    await prisma.token_info.create({ data: { symbol: 'ATOM/USDT', logo_url: 'cosmos', pair: 'cosmos', networks: 'cosmos', totalSupply: 286000000, fixedSupply: false, api: 'binance', token_exchange_query: 'BTCUSD' }});
}

const pairInfo = async () => {
    await prisma.pair.create({ data: { symbol: "BTC/USDT", pair: "BTCUSDT", pair_human: 'bitcoin' }})
    await prisma.pair.create({ data: { symbol: "ETH/USDT", pair: "ETHUSDT", pair_human: 'ethereum' }})
    await prisma.pair.create({ data: { symbol: "ZIG/USDT", pair: "ZIGUSDT", pair_human: 'zignaly' }})
    await prisma.pair.create({ data: { symbol: "LUNA/USDT", pair: "LUNAUSDT", pair_human: 'terra-luna' }})
    await prisma.pair.create({ data: { symbol: "ATOM/USDT", pair: "ATOMUSDT", pair_human: 'cosmos' }})
    await prisma.pair.create({ data: { symbol: "SOL/USDT", pair: "SOLUSDT", pair_human: 'solana' }})
}

async function main() {
    if (!(process.env.NODE_ENV === 'test')) {
        console.log('Only seed on development');
        return;
    }
    console.log('seeding');
    //await seedInfo();
    //await seedTokens();
    await pairInfo();
}

(async function run(){
    try {
        console.log('Start Seed process')
        await main();
    } catch(error) {

        console.log(error);
    }
})()
