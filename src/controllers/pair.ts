import { Request, Response } from "express";
import Pair, { PairInfo } from '../models/pair';

const getCurrentPairs = async (req: Request, res: Response) => {
  const pairs = await Pair.getPairs();
  return res.status(200).json(pairs);
}

const getPairByPair = async (req: Request, res: Response) => {
  const { pair } = req.params;

  try {
    const pairRow: PairInfo | null = await Pair.getPair(pair);
    return res.status(200).json({
      pairRow
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export default {
  getCurrentPairs,
  getPairByPair
};
