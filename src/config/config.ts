import path from "path";


const rootPath = path.resolve('./');

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
    baseDir: path.resolve('./'),
  }

  console.log(path.resolve('./'))


  const config = {
      jsdocSwagger: options
  }

export default config;