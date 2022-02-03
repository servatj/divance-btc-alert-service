const getDrop = (currentPrice: Number, highPrice: Number) : Number => {
  return parseInt(100 - (currentPrice / highPrice) * 100) < 0 ? 0 : parseInt(100 - (currentPrice / highPrice) * 100);
}


const getDropBar = (currentPrice: Number, highPrice: Number) : Number => {
  return parseInt((currentPrice / highPrice) * 100) > 100 ? 100 : parseInt((currentPrice / highPrice) * 100);
}

export default {
  getDrop, getDropBar
}
