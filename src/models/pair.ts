import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface PairInfo {
  symbol: string;
  pair: string;
  pair_human: string;
}

const getPairs = async () => await prisma.pair.findMany({
  select: {
    symbol: true,
    pair: true,
    pair_human: true,
  },
});


const getPair = async (pair: string) => await prisma.pair.findFirst({
  where: {
    pair_human: pair,
  },
});

export default {
  getPair,
  getPairs
}
