const getDrop = (currentPrice: number, highPrice: number) : number => {
  return 100 - (currentPrice / highPrice) * 100 < 0 ? 0 : 100 - (currentPrice / highPrice) * 100;
}

const getDropBar = (currentPrice: number, highPrice: number) : number => {
  return (currentPrice / highPrice) * 100 > 100 ? 100 : (currentPrice / highPrice) * 100;
}

export default {
  getDrop,
  getDropBar
}
