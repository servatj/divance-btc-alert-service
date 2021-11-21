    /** source/routes/user.ts */
    import express from 'express';
    import controller from '../controllers/btc';
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
    router.get('/ath', controller.getAth);
    router.get('/updatebtc', controller.updateBtcTable);
    router.get('/posttelegram', controller.postTgATH);
    router.post('/bootstrap', controller.bootstrap);


    export = router;