"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/user.ts */
const express_1 = __importDefault(require("express"));
const btc_1 = __importDefault(require("../controllers/btc"));
const router = express_1.default.Router();
/**
 * A user
 * @typedef {object} Btc
*/
/**
 * GET /btc
 * @summary This is the summary of the endpoint
 * @tags users
 * @return {array<btc>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "firstName": "josep",
 *     "lastName": "Servat",
 *     "email": "servat@gmail.com",
 *     "password": "password"
 *     "createdAt": "2019-09-12",
 *     "updatedAt": "2019-11-12"
 *   }
 * ]
 */
// router.get('/btc', controller.getBtcAllTimeHigh);
router.get('/ath', btc_1.default.getAth);
router.post('/updatebtc', btc_1.default.updateBtcTable);
router.post('/posttelegram', btc_1.default.postTgATH);
router.post('/bootstrap', btc_1.default.bootstrap);
module.exports = router;
//# sourceMappingURL=bitcoin.js.map