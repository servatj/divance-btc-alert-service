import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export interface TokenAth {
  price_date: Date;
  symbol: string;
  high: number;
  symbolId: number;
}

export interface TokenInfo {
  id: number;
  symbol: string;
  logo_url: string;
  networks: string;
  totalSupply: number;
  fixedSupply: boolean;
}
export interface High {
  high: number
}

const removeToken = async (id: number): Promise<void> => {
  await prisma.token_ath.deleteMany({
    where: {
      id: id
    },
  });
}

const insertTokenPrice = async ({ data } : any ) => await prisma.token_ath.create({ data });

const updateAth = async(symbol: string, currentMax: number): Promise<void> => {

  const tokenInfo = await prisma.token_info.findFirst({
    where: { symbol: symbol },
    select: { id: true },
  });

  if(tokenInfo) {
    await removeToken(tokenInfo.id);

    const currentToken: TokenAth = {
      price_date: new Date(),
      symbol: symbol,
      high: currentMax,
      symbolId: tokenInfo.id
    }

    await addToken(currentToken);
  }
}

const getMaxHigh = async (symbol: string) => await prisma.token_ath.findFirst({
  where: {
    symbol: symbol,
  },
  select: {
    high: true,
  },
}) || { high: 0 };


const getTokenList = async (): Promise<TokenAth[] | null> => {
  const tokens: TokenAth[] | null = await prisma.token_ath.findMany({
    select: {
      price_date: true,
      symbol: true,
      high: true,
      symbolId: true,
    },
  });
  return tokens;
}

const addToken = async (token: TokenAth) => {
  await prisma.token_ath.create({
    data: {
      price_date: token.price_date || new Date(),
      symbol: token.symbol || '',
      high: token.high || 0,
      symbolId: token.symbolId || 0,
    }
  });
}

const addTokenInfo = async (token: Partial<TokenInfo>) => {
  await prisma.token_info.create({
    data: {
      symbol: token.symbol || '',
      logo_url: token.logo_url || '',
      networks: token.networks || '',
      totalSupply: token.totalSupply || 0,
      fixedSupply: token.fixedSupply || false,
    }
  });
}

export default {
  getTokenList,
  getMaxHigh,
  updateAth,
  insertTokenPrice,
  addToken,
  addTokenInfo
}
