import axios from 'axios';

export const getCurrentPrice = async (symbol: string) => {
  try {
   const { data } = await axios.get(`https://price.divance.app:3000/price?pair=${symbol}`);
   const currentPrice: Number = data.price
   return Number(currentPrice);
  } catch (error) {
    console.log('error getting Current Price', error);
  }
}

export default {
  getCurrentPrice,
}
