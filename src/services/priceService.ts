import ascendexService from "./ascendexService";
import binancePriceService from "./binancePriceProxy";
import coindesk from "./coindesk";

export const getCurrentPrice = async (symbol: string, exchange: string) => {
  console.log('get current price', symbol, exchange);
  const exchanges: any = {
    ascendex: ascendexService,
    binance: binancePriceService,
    coindesk: coindesk,
  }

  return await exchanges[exchange].getCurrentPrice(symbol);
}
