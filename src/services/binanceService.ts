
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
