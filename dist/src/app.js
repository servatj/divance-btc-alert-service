"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("express"));
const express_jsdoc_swagger_1 = __importDefault(require("express-jsdoc-swagger"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const bitcoin_1 = __importDefault(require("./routes/bitcoin"));
const router = (0, express_1.default)();
(0, express_jsdoc_swagger_1.default)(router)(config_1.default.jsdocSwagger);
/** Logging */
router.use((0, morgan_1.default)('dev'));
/** Parse the request */
router.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express_1.default.json());
/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
/** Routes */
router.use('/', user_1.default);
router.use('/', bitcoin_1.default);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(router);
const PORT = process.env.PORT ?? 4000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
//# sourceMappingURL=app.js.map