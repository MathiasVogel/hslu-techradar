import express from 'express';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import techRoutes from './routes/tech.routes.js';
import { schemas } from './schemas/schemas.js';

const app = express();
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
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: schemas
    }
  },
  apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/technologies', techRoutes);

app.listen(3000, () => console.log('Server runs on http://localhost:3000/api-docs'));

app.get('/api-docs/json', (req, res) => {
  res.json(swaggerDocs);
});