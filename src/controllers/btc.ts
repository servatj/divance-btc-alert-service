import { Request, Response } from "express";
const rp = require("request-promise");
import { PrismaClient } from "@prisma/client";
import postTgAth from "../lib/telegram";
const prisma = new PrismaClient();

const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_KEY,
  APISECRET: process.env.BINANCE_SECRET,
});

const updateBtcTable = async (req: Request, res: Response) => {
  try {
    // get data
    const ticks = await binance.candlesticks("BTCUSDT", "1d");
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

    const btcRow = {
      price_date: new Date(time),
      symbol: 'BTC/USDT',
      open: Number(open),
      high: Number(high),
      low: Number(low),
      close: Number(close)
    }

    console.log(time);
    console.log(new Date(time), new Date(closeTime), high);

    // delete
    await prisma.btc.deleteMany({
      where: {
        price_date: new Date(time),
      },
    });

    // insert
    await prisma.btc.create({
      data: btcRow
    });


    const max = await prisma.btc.aggregate({
      _max: {
        high: true,
      },
    });

    const previousMax = await prisma.btc_ath.aggregate({
      _max: {
        high: true,
      },
    });

    if (previousMax < max) {
      await prisma.btc.deleteMany({
        where: {
          symbol: 'BTC/USDT'
        },
      });

      await prisma.btc_ath.create( {
        data: {
          price_date: new Date(),
          symbol: 'BTC/USDT',
          high: Number(max)
        }
      });

      postTgAth(max.toString());
    }

    res.status(200).json({
      response: 'Updated'
    })
    // litescript
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getAth = async (req: Request, res: Response) => {
  try {
    const max = await prisma.btc_ath.aggregate({
      _max: {
        high: true,
      },
    });
    return res.status(200).json({
      rows: max,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const ath = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error ${error}`);
  }
};

const postTgATH = async (req: Request, res: Response) => {
  postTgAth('69000');
  return res.status(200).json({
    message: 'posted',
  });
}

const bootstrap = async (req: Request, res: Response) => {
  const { price } = req.body;
  await prisma.btc_ath.create( {
    data: {
      price_date: new Date('2021-11-10'),
      symbol: 'BTC/USDT',
      high: 65000
    }
  });
  return res.status(200).json({
    message: 'bootstraped',
  });
}

export default { getAth, updateBtcTable, postTgATH, bootstrap };
