
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.MOSAICIFY_POSTGRES_URL
});

export const db = drizzle(pool);