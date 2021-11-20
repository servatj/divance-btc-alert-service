import http from 'http';
import config from './config/config';
import express, { Express } from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import morgan from 'morgan';
import routesUser from './routes/user';
import routesBtc from './routes/bitcoin';
import swaggerUi from 'swagger-ui-express';


const router: Express = express();

expressJSDocSwagger(router)(config.jsdocSwagger);

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

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
router.use('/', routesUser);
router.use('/', routesBtc)

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 4000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));