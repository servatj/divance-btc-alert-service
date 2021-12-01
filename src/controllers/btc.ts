import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import postTgAth from "../lib/telegram";
const prisma = new PrismaClient();
// todo use axios everywhere
const axios = require('axios');

const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_KEY,
  APISECRET: process.env.BINANCE_SECRET,
});


const getBinancePrice = async (symbol: string, pair: string) => {
  const ticks = await binance.candlesticks(pair, "1d");
  let lastTick = ticks[ticks.length - 1];
  let [
    time,
    open,
    high,
    low,
    close,
    volume,
    closeTime,
    assetVolume,
    trades,
    buyBaseVolume,
    buyAssetVolume,
    ignored,
  ] = lastTick;

  return  {
    price_date: new Date(time),
    symbol: symbol,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
  };
}


const getAscendexPrice = async (symbol: string) => {
  const { data } = await axios.get(`https://ascendex.com/api/pro/v1/barhist?symbol=${symbol}&interval=1D`);
  let lastPrice = data.data[data.data.length - 1];

  return  {
    price_date: new Date(lastPrice.data.ts),
    symbol: symbol,
    open: parseFloat(lastPrice.data.o),
    high: parseFloat(lastPrice.data.h),
    low: parseFloat(lastPrice.data.l),
    close: parseFloat(lastPrice.data.c),
  };
}

const processUpdate = async (pair: string, symbol: string) => {

  let row;

  // TODO implement pairs in different exchanges
  if(pair === 'ZIGUSDT') {
    row = await getAscendexPrice(symbol)
  } else {
    row = await getBinancePrice(symbol, pair)
  }


  // delete
  await prisma.btc.deleteMany({
    where: {
      price_date: new Date(row.price_date),
      symbol: symbol
    },
  });

  // insert
  await prisma.btc.create({
    data: row,
  });

  console.log('🦊🦊 insert')
  // get the current time max
  let max;
  max = await prisma.btc.groupBy({
    by: ['symbol'],
    _max: {
      high: true,
    },
  });

  const currentMax = max[0]._max.high || 0;
  console.log("max", currentMax);

  // get the previous max
  let maxPrevious;
  maxPrevious = await prisma.btc_ath.findFirst({
    where: {
      symbol: symbol,
    },
    select: {
      high: true,
    },
  }) || { high: 0 };

  const previousMax = maxPrevious.high;

  if (previousMax < currentMax) {
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
   postTgAth(currentMax.toString(), symbol);
  }
};

const updateAggregatesTable = async (req: Request, res: Response) => {
  try {
    const supportedPairs = [
      { symbol: "BTC/USDT", pair: "BTCUSDT" },
      { symbol: "ETH/USDT", pair: "ETHUSDT" },
      { symbol: "ZIG/USDT", pair: "ZIGUSDT" }
    ];

    for(const pair of supportedPairs) {
      await  processUpdate(pair.pair, pair.symbol);
    }

    res.status(200).json({
      response: "Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getAth = async (req: Request, res: Response) => {
  try {
    const ath: object | null = await prisma.btc_ath.findMany({
      select: {
        symbol: true,
        price_date: true,
        high: true,
      },
    });
    return res.status(200).json({
      rows: ath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const postTgATH = async (req: Request, res: Response) => {
  const { price } = req.body;
  postTgAth(price, '');
  return res.status(200).json({
    message: "posted",
  });
};

const bootstrap = async (req: Request, res: Response) => {
  const { price } = req.body;
  await prisma.btc_ath.create({
    data: {
      price_date: new Date("2021-11-10"),
      symbol: "BTC/USDT",
      high: 65000,
    },
  });
  return res.status(200).json({
    message: "bootstraped",
  });
};

export default { getAth, postTgATH, bootstrap, updateAggregatesTable };
