import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface TokenInfo {
  price_date: Date;
  symbol: String;
  high: Number;
}

export interface High {
  high: Number
}

const addToken = () => {
  return 'Not Implemented'
}

const RemoveToken = () => {

}

const insertTokenPrice = async ({ data } : any ) => await prisma.btc_ath.create({ data });

const updateAth = async(symbol: string, currentMax: number): Promise<void> => {
  await prisma.btc_ath.deleteMany({
    where: {
      symbol: symbol,
    },
  });

  await prisma.btc_ath.create({
    data: {
      price_date: new Date(),
      symbol: symbol,
      high: currentMax,
    },
  });
}

const getMaxHigh = async (symbol: string) => await prisma.btc_ath.findFirst({
  where: {
    symbol: symbol,
  },
  select: {
    high: true,
  },
}) || { high: 0 };


const getTokenList = async (): Promise<TokenInfo[] | null> => {
  const tokens: TokenInfo[] | null = await prisma.btc_ath.findMany({
    select: {
      symbol: true,
      price_date: true,
      high: true,
    },
  });
  return tokens;
}

export default {
  getTokenList,
  getMaxHigh,
  updateAth,
  insertTokenPrice
}
