
const axios = require('axios');

export const getAscendexPrice = async (symbol: string) => {
  const { data } = await axios.get(`https://ascendex.com/api/pro/v1/barhist?symbol=${symbol}&interval=1D`);
  let lastPrice = data.data[data.data.length - 1];

  return  {
    price_date: new Date(lastPrice.data.ts),
    symbol: symbol,
    open: parseFloat(lastPrice.data.o),
    high: parseFloat(lastPrice.data.h),
    low: parseFloat(lastPrice.data.l),
    close: parseFloat(lastPrice.data.c),
  };
}
