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

export default {
	getCurrentPrice,
};
