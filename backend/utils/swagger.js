import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from "dotenv"
dotenv.config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'API documentation for our Expense Tracker backend'
    },
    servers: [
      {
        url: process.env.MODE_ENV == 'development' ? 'http://localhost:3000' : 'https://expense-tracker-w2f1.onrender.com'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'] // Where your route files live
};

export const swaggerSpec = swaggerJSDoc(options);
