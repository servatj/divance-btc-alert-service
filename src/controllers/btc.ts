import { Request, Response } from "express";
import postTgAth from "../lib/telegram";
import { getAscendexPrice } from '../services/ascendexService';
import { getBinancePrice } from '../services/binanceService';
import Token, { TokenInfo } from '../models/token';
import TokenCandle, { TokenTypeCandle, MaxPrice } from '../models/tokenCandles'
// todo use axios everywhere

const pairs = [
  { symbol: "BTC/USDT", pair: "BTCUSDT" },
  { symbol: "ETH/USDT", pair: "ETHUSDT" },
  { symbol: "ZIG/USDT", pair: "ZIGUSDT" },
  { symbol: "LUNA/USDT", pair: "LUNAUSDT" },
  { symbol: "ATOM/USDT", pair: "ATOMUSDT" },
  { symbol: "SOL/USDT", pair: "SOLUSDT" }
]

const processUpdate = async (pair: string, symbol: string) => {
  let row: TokenTypeCandle;

  if(pair === 'ZIGUSDT') {
    row = await getAscendexPrice(symbol)
  } else {
    row = await getBinancePrice(symbol, pair)
  }

  TokenCandle.upsert(symbol, row);

  const max = await TokenCandle.getHighestPrice();
  const getCurrenMax = max.find(pair => pair.symbol === symbol) || { _max : { high: 0 } };
  const currentMax = getCurrenMax._max.high || 0;
  const previousMax = await Token.getMaxHigh(symbol).then((maxPrice: { high: Number }) => maxPrice.high);

  if (previousMax < currentMax) {
    await Token.updateAth(symbol, currentMax);
    postTgAth(currentMax.toString(), symbol);
  }
};

const getCurrentPairs = async (req: Request, res: Response) => {
  return res.status(200).json(pairs);
}

const updateAggregatesTable = async (req: Request, res: Response) => {
  try {
    const supportedPairs = pairs;

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
    return res.status(200).json({
      rows: await Token.getTokenList() as TokenInfo[],
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
  const data = {
    price_date: new Date("2021-11-10"),
    symbol: "BTC/USDT",
    high: 65000,
  }

  await Token.insertTokenPrice({ data });
  return res.status(200).json({
    message: "bootstraped",
  });
};

export default {
  getAth,
  postTgATH,
  bootstrap,
  getCurrentPairs,
  updateAggregatesTable
};
