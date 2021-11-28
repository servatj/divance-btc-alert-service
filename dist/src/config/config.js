"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const rootPath = path_1.default.resolve('./');
const options = {
    info: {
        version: '1.0.0',
        title: 'BTC Alert management API',
        license: {
            name: 'MIT',
            url: 'http://btcalert.com',
        },
        description: 'API desctiption',
        contact: {
            name: 'Josep',
            url: 'http://btcalert.com',
            email: "divancetwitch@gmail.com"
        },
        termsOfService: 'http://divance.es',
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Local API server',
            variables: {
                port: {
                    enum: [
                        '4000',
                    ],
                    default: '4000',
                }
            },
        },
    ],
    security: {
        BearerAuth: {
            type: "http",
            scheme: "bearer"
        }
    },
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    filesPattern: './**/*.ts',
    baseDir: path_1.default.resolve('./'),
};
const config = {
    jsdocSwagger: options
};
exports.default = config;
//# sourceMappingURL=config.js.map