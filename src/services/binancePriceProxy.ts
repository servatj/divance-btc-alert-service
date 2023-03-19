import axios, { AxiosError } from "axios";

export const getCurrentPrice = async (symbol: string) => {
	try {
		const { data } = await axios.get(
			`https://price.divance.app/price?pair=${symbol}`
		);
		const currentPrice: Number = data.price;
		return Number(currentPrice);
	} catch (error) {
		const error1 = error as Error | AxiosError;
		console.log("error getting Current Price", error1.message);
	}
};

export const getBinancePrice = async (pair: string) => {
	const { data } = await axios.get(
		`https://price.divance.app/tick?pair=${pair}`
	);
	const [tick] = data;
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
	] = tick;

	return {
		price_date: new Date(time),
		symbol: pair,
		open: parseFloat(open),
		high: parseFloat(high),
		low: parseFloat(low),
		close: parseFloat(close),
	};
};

export default {
	getCurrentPrice,
	getBinancePrice,
};
