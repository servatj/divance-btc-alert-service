import { Request, Response } from "express";
import postTgAth from "../lib/telegram";
import { getAscendexPrice } from '../services/ascendexService';
import { getBinancePrice } from '../services/binanceService';
import Token, { TokenAth, TokenInfo} from '../models/token';
import Pair from '../models/pair';
import TokenCandle, { TokenTypeCandle, MaxPrice } from '../models/tokenCandles'
import Coindesk from '../services/coindesk';
import Calc from '../lib/calc';
import { getCurrentPrice } from '../services/priceService';

import { body, validationResult } from 'express-validator';

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


const updateAggregatesTable = async (req: Request, res: Response) => {
  try {
    const supportedPairs = await Pair.getPairs();

    console.log('supportedPairs', supportedPairs);

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

const getAthBySymbol = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  try {
    const token: any = await Token.getTokenBySymbol(symbol);
    const addPriceDrop = async (token: any) => {
      const currentPrice: number = await getCurrentPrice(token.token_exchange_query, token.api) as number;
      const priceDrop = Math.round(Calc.getDrop(currentPrice, token.high));
      const priceDropBar = Calc.getDropBar(currentPrice, token.high);
      const networks = token.networks.split(',');
      const mergedToken = { ...token, priceDrop, priceDropBar, currentPrice, networks };
      return mergedToken;
    }

    const tokenListMerged = await addPriceDrop(token);
    return res.status(200).json({
      tokenListMerged
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getAthByPair = async (req: Request, res: Response) => {
  const { pair } = req.params;
  try {
    const token: any = await Token.getTokenByPair(pair);
    console.log('token', token);

    const addPriceDrop = async (token: any) => {
      console.log('token', token);
      const currentPrice: number = await getCurrentPrice(token.token_exchange_query, token.api)  as number;

      const priceDrop = Math.round(Calc.getDrop(currentPrice, token.high));
      const priceDropBar = Calc.getDropBar(currentPrice, token.high);
      const networks = token.networks.split(',');
      const mergedToken = { ...token, priceDrop, priceDropBar, currentPrice, networks };
      return mergedToken;
    }
    const tokenListMerged = await addPriceDrop(token[0]);

    return res.status(200).json({
      tokenListMerged
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getAth = async (req: Request, res: Response) => {
  try {
    const tokenLists: any = await Token.getTokenList();
    const addPriceDrop = async (token: any) => {
      console.log('token', token);
      const currentPrice: number = await getCurrentPrice(token.token_exchange_query, token.api) as number;
      const priceDrop = Math.round(Calc.getDrop(currentPrice, token.high));
      const priceDropBar = Calc.getDropBar(currentPrice, token.high);
      const networks = token.networks.split(',');
      const mergedToken = { ...token, priceDrop, priceDropBar, currentPrice, networks };
      return mergedToken;
    }

    const tokenListMerged = await Promise.all(tokenLists.map(addPriceDrop));

    console.log(tokenListMerged);
    return res.status(200).json({
      rows:  await Promise.all(tokenLists.map(addPriceDrop))
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

const addTokenInfo = async (req: Request, res: Response) => {
  const { symbol, logo_url, networks, totalSupply, fixedSupply } : TokenInfo = req.body;

  const token: Partial<TokenInfo> = {
    symbol,
    logo_url,
    networks,
    totalSupply,
    fixedSupply
  }

  Token.addTokenInfo(token);

  res.status(200).send({
    message: "added",
  });
}

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
  updateAggregatesTable,
  addTokenInfo,
  getAthByPair,
  getAthBySymbol
};
