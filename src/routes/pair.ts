import express from 'express';
import controller from '../controllers/pair';
import { body, validationResult } from 'express-validator';

const router = express.Router()
/**
 * A user
 * @typedef {object} Btc
*
/**
 * GET /pair
 * @summary This is the summary of the endpoint
 * @tags users
 * @return {array<btc>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "symbol": "BTC/USDT",
 *     "pair": "BTCUSDT",
 *     "pair_human": "bitcoin"
 *   }
 * ]
 */
router.get('/pairs/:pair', controller.getPairByPair);
router.get('/pairs', controller.getCurrentPairs);

export = router;
