// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// import controller from '../../controllers/btc';


// beforeAll(async () => {

//   // create prices in the db
//   await prisma.btc.createMany({
//     data: [{
//       price_date: new Date(),
//       symbol: "BTC/USDT",
//       open: 1202,
//       high: 1600,
//       low: 900,
//       close: 1500,
//     }],
//   })
//   console.log('✨ 1 high successfully created!')

//   // create some historic highs
//   await prisma.btc_ath.createMany({
//     data: [{
//       price_date: new Date('2010-11-12'),
//       symbol: "BTC/USDT",
//       high: 2000,
//     }],
//   })
//   console.log('✨ 2 Data successfully created!')
// })

// afterAll(async () => {
//   const deleteBtc = prisma.btc.deleteMany()
//   const deleteBtcAth = prisma.btc_ath.deleteMany()

//   await prisma.$transaction([
//     deleteBtc,
//     deleteBtcAth
//   ])

//   await prisma.$disconnect()
// })

// it('should update the btc price', async () => {
//   try {

//     const btcData = await prisma.btc.findMany({
//       select: {
//         symbol: true,
//         price_date: true,
//         high: true
//       }
//     })

//     const pairsCount = await prisma.btc.count();

//     const btcDataAth = await prisma.btc_ath.findMany({
//       select: {
//         symbol: true,
//         price_date: true,
//         high: true
//       }
//     });

//     const pairsAthCount = await prisma.btc_ath.count();

//     console.log(pairsAthCount);

//     await controller.updateAggregatesTable();

//     const pairsBtCountAfter = await prisma.btc.count();

//     console.log(pairsBtCountAfter);
//   } catch(error) {
//     console.log(error)
//   }
// })
