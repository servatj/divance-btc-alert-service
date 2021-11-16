import { Request, Response } from "express";
const rp = require("request-promise");
import { PrismaClient } from "@prisma/client";

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
    let lastTick = ticks[ticks.length - 2];
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
    console.log("get Ath");
    const btcRows = await prisma.btc.findMany();
    const max = await prisma.btc.aggregate({
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

export default { getAth, updateBtcTable };
