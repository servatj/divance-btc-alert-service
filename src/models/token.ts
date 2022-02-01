import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface TokenInfo {
  price_date: Date;
  symbol: String;
  high: Number;
}

const addToken = () => {
  return 'Not Implemented'
}

const RemoveToken = () => {

}

const insertTokenPrice = () => {

}

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
  getTokenList
}
