"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const client_1 = require("@prisma/client");
const telegram_1 = __importDefault(require("../lib/telegram"));
const prisma = new client_1.PrismaClient();
const Binance = require("node-binance-api");
const binance = new Binance().options({
    APIKEY: process.env.BINANCE_KEY,
    APISECRET: process.env.BINANCE_SECRET,
});
const processUpdate = async (pair, symbol) => {
    const ticks = await binance.candlesticks(pair, "1d");
    let lastTick = ticks[ticks.length - 1];
    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored,] = lastTick;
    const row = {
        price_date: new Date(time),
        symbol: symbol,
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
    };
    console.log(row);
    console.log(time);
    console.log(new Date(time), new Date(closeTime), high);
    // delete
    await prisma.btc.deleteMany({
        where: {
            price_date: new Date(time),
            symbol: symbol
        },
    });
    // insert
    await prisma.btc.create({
        data: row,
    });
    // get the current time max
    let max;
    max = await prisma.btc.groupBy({
        by: ['symbol'],
        _max: {
            high: true,
        },
    });
    const currentMax = max[0]._max.high || 0;
    console.log("max", currentMax);
    // get the previous max
    let maxPrevious;
    maxPrevious = await prisma.btc_ath.findFirst({
        where: {
            symbol: symbol,
        },
        select: {
            high: true,
        },
    }) || { high: 0 };
    const previousMax = maxPrevious.high;
    console.log("previous", previousMax);
    if (previousMax < currentMax) {
        await prisma.btc_ath.deleteMany({
            where: {
                symbol: symbol,
            },
        });
        await prisma.btc_ath.create({
            data: {
                price_date: new Date(),
                symbol: symbol,
                high: currentMax,
            },
        });
        (0, telegram_1.default)(currentMax.toString());
    }
};
const updateAggregatesTable = async (req, res) => {
    try {
        const supportedPairs = [
            { symbol: "BTC/USDT", pair: "BTCUSDT" },
            { symbol: "EUR/USDT", pair: "EURUSDT" },
        ];
        supportedPairs.forEach((pair) => {
            processUpdate(pair.pair, pair.symbol);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};
const updateBtcTable = async (req, res) => {
    try {
        // get data
        const ticks = await binance.candlesticks("BTCUSDT", "1d");
        let lastTick = ticks[ticks.length - 1];
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored,] = lastTick;
        const btcRow = {
            price_date: new Date(time),
            symbol: "BTC/USDT",
            open: Number(open),
            high: Number(high),
            low: Number(low),
            close: Number(close),
        };
        console.log(btcRow);
        console.log(time);
        console.log(new Date(time), new Date(closeTime), high);
        // delete
        await prisma.btc.deleteMany({
            where: {
                price_date: new Date(time),
            },
        });
        // insert
        await prisma.btc.create({
            data: btcRow,
        });
        let max;
        max = await prisma.btc.aggregate({
            _max: {
                high: true,
            },
        });
        const currentMax = max._max.high || 0;
        console.log("max", currentMax);
        max = await prisma.btc_ath.aggregate({
            _max: {
                high: true,
            },
        });
        const previousMax = max._max.high || 0;
        console.log("previous", previousMax);
        if (previousMax < currentMax) {
            await prisma.btc_ath.deleteMany({
                where: {
                    symbol: "BTC/USDT",
                },
            });
            await prisma.btc_ath.create({
                data: {
                    price_date: new Date(),
                    symbol: "BTC/USDT",
                    high: currentMax,
                },
            });
            (0, telegram_1.default)(currentMax.toString());
        }
        res.status(200).json({
            response: "Updated",
        });
        // litescript
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};
const getAth = async (req, res) => {
    try {
        const ath = await prisma.btc_ath.findMany({
            select: {
                symbol: true,
                price_date: true,
                high: true,
            },
        });
        return res.status(200).json({
            rows: ath,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};
const getAthOld = async (req, res) => {
    try {
        const ath = await prisma.btc_ath.findUnique({
            where: {
                symbol: "BTC/USDT",
            },
            select: {
                price_date: true,
                high: true,
            },
        });
        return res.status(200).json({
            rows: ath,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};
const postTgATH = async (req, res) => {
    const { price } = req.body;
    (0, telegram_1.default)(price);
    return res.status(200).json({
        message: "posted",
    });
};
const bootstrap = async (req, res) => {
    const { price } = req.body;
    await prisma.btc_ath.create({
        data: {
            price_date: new Date("2021-11-10"),
            symbol: "BTC/USDT",
            high: 65000,
        },
    });
    return res.status(200).json({
        message: "bootstraped",
    });
};
exports.default = { getAth, updateBtcTable, postTgATH, bootstrap, updateAggregatesTable };
//# sourceMappingURL=btc.js.map