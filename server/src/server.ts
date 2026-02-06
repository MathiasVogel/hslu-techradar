import express from 'express';
import techRoutes from './routes/tech.routes.js';

const app = express();
app.use(express.json());

app.use('/api/technologies', techRoutes);

app.listen(3000, () => console.log('Server runs on http://localhost:3000/api-docs'));