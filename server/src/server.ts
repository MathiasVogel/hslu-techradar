import 'dotenv/config';
import express from 'express';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import techRoutes from './routes/tech.routes.js';
import { schemas } from './schemas/schemas.js';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';
const SWAGGER_SERVER_URL = process.env.SWAGGER_SERVER_URL || `http://localhost:${PORT}`;

const app = express();

app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Techradar API',
      version: '1.0.0',
      description: 'API Dokumentation',
    },
    servers: [
      {
        url: SWAGGER_SERVER_URL,
      },
    ],
    components: {
      schemas: schemas
    }
  },
  apis: ['./src/routes/*.ts', './dist/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get('/api-spec', (req, res) => {
  res.send(swaggerDocs);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/technologies', techRoutes);

app.listen(PORT, () => console.log(`Tech Server runs on http://localhost:${PORT}/api-docs`));
