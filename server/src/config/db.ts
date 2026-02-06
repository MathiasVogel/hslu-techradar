import 'dotenv/config';
import { PrismaClient } from '../generated/client/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  user: 'user',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'techradar',
});

const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });