import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface TokenTypeCandle {
  price_date: Date;
  symbol: string;
  open: number
  high: number;
  low: number;
  close: number;
}

export type HighPrice = {
  high: Number | null ;
}

export type MaxPrice = {
  symbol: string,
  _max: { high: Number }
}

const addToken = () => {
  return 'Not Implemented'
}

const RemoveToken = () => {

}

const insertTokenPrice = () => {

}

const getHighestPrice = async () => await prisma.btc.groupBy({
  by: ['symbol'],
  _max: {
    high: true,
  },
});

const upsert = async (symbol: string, row: TokenTypeCandle) : Promise<void> => {
    await prisma.btc.deleteMany({
      where: {
        price_date: new Date(row.price_date),
        symbol: symbol
      },
    });

    await prisma.btc.create({
      data: row,
    });
}

export default {
  upsert,
  getHighestPrice
}
