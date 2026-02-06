import express from 'express';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import techRoutes from './routes/tech.routes.js';
import path from "node:path";

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
  },
  apis: [path.join(__dirname, './routes/*.ts')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

console.log('Anzahl gefundener Pfade:', Object.keys(swaggerDocs).length);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/technologies', techRoutes);

app.listen(3000, () => console.log('Server runs on http://localhost:3000/api-docs'));

app.get('/api-docs/json', (req, res) => {
  res.json(swaggerDocs);
});