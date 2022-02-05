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
  pair: string;
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



const getTokenList = async () => {
  const result = await prisma.$queryRaw`
    select
      "symbolId",
      price_date,
      high,
      logo_url,
      pair,
      networks,
      "totalSupply",
      "fixedSupply",
      ta.symbol
    from alert."Token_ath" ta  inner join alert."Token_info" ti on ta."symbolId" = ti.id
  `;
  return result;
}

const getTokenByPair = async (pair: string) => {
  console.log('😀' + pair);
  const result = await prisma.$queryRaw`
    select
      "symbolId",
      price_date,
      high,
      logo_url,
      pair,
      networks,
      "totalSupply",
      "fixedSupply",
      ta.symbol
    from alert."Token_ath" ta  inner join alert."Token_info" ti on ta."symbolId" = ti.id
    where pair = ${pair}
  `;
  return result;
}


const getTokenBySymbol = async (symbol: string) => await prisma.token_ath.findFirst({
  where: {
    symbol: symbol,
  },
  select: {
    id: true,
    symbol: true,
    high: true,
    price_date: true
  },
}) || { id: 0 };

const addToken = async (token: TokenAth) => {
  await prisma.token_ath.create({
    data: {
      price_date: token.price_date || new Date(),
      symbol: token.symbol || '',
      high: token.high || 0,
      symbolId: token.symbolId | 0,
    }
  });
}

const addTokenInfo = async (token: Partial<TokenInfo>) => {
  await prisma.token_info.create({
    data: {
      symbol: token.symbol || '',
      logo_url: token.logo_url || '',
      pair: token.pair || '',
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
  addTokenInfo,
  getTokenByPair,
  getTokenBySymbol
}
