import axios from 'axios';


const getCurrentSymbolPrice = async (symbol: string) => {
  const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
  const currentPrice: Number = data[symbol].usd;
  return {
    symbol,
    currentPrice
  }
}

export const getCurrentPrice = async (symbol: string) => {
  try {
   const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
   const currentPrice: Number = data[symbol] ? data[symbol].usd : 0;
   return Number(currentPrice);
  } catch (error) {
    console.log('error getting Current Price', error);
  }
}

export default {
  getCurrentPrice,
  getCurrentSymbolPrice
}
