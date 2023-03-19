    /** source/routes/user.ts */
    import express from 'express';
    import controller from '../controllers/tokenInfo';
    const router = express.Router();


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
    router.get('/token_info/:id', controller.getTokenInfoById);
    router.put('/token_info/:id', controller.updateTokenInfo);
    router.post('/token_info', controller.createTokenInfo);
    router.delete('/token_info/:id', controller.deleteTokenInfo);
    export = router;
