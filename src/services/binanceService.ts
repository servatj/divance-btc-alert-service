
const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_KEY,
  APISECRET: process.env.BINANCE_SECRET,
});

export const getBinancePrice = async (symbol: string, pair: string) => {
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

export const getBinanceCurrentPrice = async (symbol: string) => {
  try {
    const tick = await binance.prices(symbol);
    const currentPrice = tick[symbol];
    return currentPrice;
  } catch (error) {
    console.log("error getting current price", error);
  }
}

export const getCurrentPrice = async (symbol: string) => {
  try {
    const tick = await binance.prices(symbol);
    const currentPrice = tick[symbol];
    return Number(currentPrice);
  } catch (error) {
    console.log("error getting current price", error);
  }
}

export default {
  getCurrentPrice
}
