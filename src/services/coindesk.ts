import axios from 'axios';

const getCurrentPrice = async (symbol: string) => {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
  const currentPrice: Number = data[symbol].usd;
  return {
    symbol,
    currentPrice
  }
}

export default {
  getCurrentPrice,
}
